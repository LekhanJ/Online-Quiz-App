const { Quiz, Question, Result, User } = require('../models');

const createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit, questions } = req.body;

    if (!title || !timeLimit || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Title, timeLimit, and questions are required' });
    }

    const quiz = await Quiz.create({
      title,
      description,
      timeLimit,
      creatorId: req.user.id
    });

    const questionData = questions.map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      quizId: quiz.id
    }));

    await Question.bulkCreate(questionData);

    res.status(201).json({ quiz, message: 'Quiz created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Question, attributes: ['id'] }
      ],
      attributes: ['id', 'title', 'description', 'timeLimit', 'createdAt']
    });

    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      createdAt: quiz.createdAt,
      creator: quiz.User.username,
      questionCount: quiz.Questions.length
    }));

    res.json(formattedQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Question, attributes: ['id', 'question', 'options'] }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findByPk(quizId, {
      include: [{ model: Question }]
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let score = 0;
    const details = quiz.Questions.map((question) => {
      const selected = answers[question.id];
      const isCorrect = selected === question.correctAnswer;
      if (isCorrect) score++;
      return {
        id: question.id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedAnswer: selected ?? null,
        isCorrect,
      };
    });

    const result = await Result.create({
      userId: req.user.id,
      quizId: parseInt(quizId),
      score,
      totalQuestions: quiz.Questions.length,
      timeTaken,
      answers
    });

    res.json({
      score,
      totalQuestions: quiz.Questions.length,
      percentage: Math.round((score / quiz.Questions.length) * 100),
      timeTaken,
      resultId: result.id,
      details,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id); 
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    if (quiz.creatorId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await quiz.destroy();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      where: { creatorId: req.user.id },
      include: [{ model: Question, attributes: ['id'] }],
      attributes: ['id', 'title', 'description', 'timeLimit', 'createdAt']
    });

    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      createdAt: quiz.createdAt,
      questionCount: quiz.Questions.length
    }));

    res.json(formattedQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserResults = async (req, res) => {
  try {
    const results = await Result.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Quiz, attributes: ['title'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formattedResults = results.map(result => ({
      id: result.id,
      quizTitle: result.Quiz.title,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: Math.round((result.score / result.totalQuestions) * 100),
      timeTaken: result.timeTaken,
      createdAt: result.createdAt
    }));

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuiz,
  deleteQuiz,
  submitQuiz,
  getUserQuizzes,
  getUserResults
};
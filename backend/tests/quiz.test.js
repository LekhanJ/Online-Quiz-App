const request = require('supertest');
const app = require('../src/server');
const sequelize = require('../src/config/database');

describe('Quiz App API', () => {
  let authToken;
  let userId;
  let quizId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Authentication', () => {
    test('Register user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe('testuser');
      
      authToken = response.body.token;
      userId = response.body.user.id;
    });

    test('Login user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe('testuser');
    });

    test('Login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('Quiz Management', () => {
    test('Create quiz', async () => {
      const quizData = {
        title: 'Sample Quiz',
        description: 'A test quiz',
        timeLimit: 10,
        questions: [
          {
            question: 'What is 2+2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1
          },
          {
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2
          }
        ]
      };

      const response = await request(app)
        .post('/api/quiz')
        .set('Authorization', `Bearer ${authToken}`)
        .send(quizData);

      expect(response.status).toBe(201);
      expect(response.body.quiz.title).toBe('Sample Quiz');
      
      quizId = response.body.quiz.id;
    });

    test('Get all quizzes', async () => {
      const response = await request(app)
        .get('/api/quiz');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Get specific quiz', async () => {
      const response = await request(app)
        .get(`/api/quiz/${quizId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Sample Quiz');
      expect(response.body.Questions).toBeDefined();
      expect(response.body.Questions.length).toBe(2);
    });

    test('Submit quiz answers', async () => {
      const answers = {
        1: 1, 
        2: 2 
      };

      const response = await request(app)
        .post(`/api/quiz/${quizId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          answers,
          timeTaken: 300 
        });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(2);
      expect(response.body.totalQuestions).toBe(2);
      expect(response.body.percentage).toBe(100);
    });

    test('Get user created quizzes', async () => {
      const response = await request(app)
        .get('/api/quiz/my-quizzes')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Sample Quiz');
    });

    test('Get user quiz results', async () => {
      const response = await request(app)
        .get('/api/quiz/my-results')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].score).toBe(2);
    });
  });

  describe('Error Handling', () => {
    test('Access protected route without token', async () => {
      const response = await request(app)
        .post('/api/quiz')
        .send({
          title: 'Test Quiz',
          timeLimit: 10,
          questions: []
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Access token required');
    });

    test('Create quiz with missing data', async () => {
      const response = await request(app)
        .post('/api/quiz')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Incomplete Quiz'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title, timeLimit, and questions are required');
    });
  });
});
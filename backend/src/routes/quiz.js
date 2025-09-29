const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  submitQuiz,
  deleteQuiz,
  getUserQuizzes,
  getUserResults
} = require('../controllers/quizController');

const router = express.Router();

router.post('/', authenticateToken, createQuiz);
router.get('/', getQuizzes);
router.get('/my-quizzes', authenticateToken, getUserQuizzes);
router.get('/my-results', authenticateToken, getUserResults);
router.get('/:id', authenticateToken, getQuiz);
router.post('/:id/submit', authenticateToken, submitQuiz);
router.delete('/:id', authenticateToken, deleteQuiz);

module.exports = router;
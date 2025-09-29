const User = require('./User');
const Quiz = require('./Quiz');
const Question = require('./Question');
const Result = require('./Result');

User.hasMany(Quiz, { foreignKey: 'creatorId' });
Quiz.belongsTo(User, { foreignKey: 'creatorId' });

Quiz.hasMany(Question, { foreignKey: 'quizId' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

User.hasMany(Result, { foreignKey: 'userId' });
Result.belongsTo(User, { foreignKey: 'userId' });

Quiz.hasMany(Result, { foreignKey: 'quizId' });
Result.belongsTo(Quiz, { foreignKey: 'quizId' });

module.exports = { User, Quiz, Question, Result };
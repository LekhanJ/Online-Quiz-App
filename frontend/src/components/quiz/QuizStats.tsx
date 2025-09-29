import { Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { QuizStatsProps } from '@/types';

export const QuizStats: React.FC<QuizStatsProps> = ({ result }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-700 bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200';
    if (percentage >= 60) return 'text-blue-700 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200';
    if (percentage >= 40) return 'text-amber-700 bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200';
    return 'text-red-700 bg-gradient-to-br from-red-50 to-rose-100 border-red-200';
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👏';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  const getProgressGradient = (percentage: number) => {
    if (percentage >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (percentage >= 60) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    if (percentage >= 40) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-rose-500';
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-slate-50 rounded-3xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm">
      <div className="text-center mb-10">
        <div className="text-7xl mb-6 animate-bounce">
          {getScoreEmoji(result.percentage)}
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          Quiz Completed!
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          Fantastic effort! Here's how you performed:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Score */}
        <div className="text-center group hover:scale-105 transition-all duration-300">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${getScoreColor(result.percentage)} border-2 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Trophy className="h-10 w-10" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {result.score}/{result.totalQuestions}
          </div>
          <div className="text-sm text-gray-600 font-medium">Questions Correct</div>
        </div>

        {/* Percentage */}
        <div className="text-center group hover:scale-105 transition-all duration-300">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${getScoreColor(result.percentage)} border-2 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Target className="h-10 w-10" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {result.percentage}%
          </div>
          <div className="text-sm text-gray-600 font-medium">Accuracy</div>
        </div>

        {/* Time Taken */}
        <div className="text-center group hover:scale-105 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-purple-700 bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Clock className="h-10 w-10" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatTime(result.timeTaken)}
          </div>
          <div className="text-sm text-gray-600 font-medium">Time Taken</div>
        </div>

        {/* Performance */}
        <div className="text-center group hover:scale-105 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-indigo-700 bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-indigo-200 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <TrendingUp className="h-10 w-10" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {result.percentage >= 80 ? 'Excellent' :
             result.percentage >= 60 ? 'Good' :
             result.percentage >= 40 ? 'Fair' : 'Needs Work'}
          </div>
          <div className="text-sm text-gray-600 font-medium">Performance</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-800">Overall Score</span>
          <span className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{result.percentage}%</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ease-out shadow-md ${getProgressGradient(result.percentage)}`}
            style={{ width: `${result.percentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-gray-100 border border-gray-200 shadow-inner">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">
            {result.percentage >= 90 ? "🌟 Outstanding! You're a quiz master!" :
             result.percentage >= 80 ? "🎯 Excellent work! You really know your stuff!" :
             result.percentage >= 70 ? "📈 Great job! You're on the right track!" :
             result.percentage >= 60 ? "💪 Good effort! Keep practicing to improve!" :
             "🚀 Don't give up! Every quiz is a learning opportunity!"}
          </p>
        </div>
      </div>
    </div>
  );
};
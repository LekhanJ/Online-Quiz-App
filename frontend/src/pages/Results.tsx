import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Trophy, Clock, Target, TrendingUp, Calendar, BookOpen } from 'lucide-react';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { userResults, loading, fetchUserResults } = useQuizStore();

  useEffect(() => {
    fetchUserResults();
  }, [fetchUserResults]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPerformanceLabel = (percentage: number) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Fair';
    if (percentage >= 40) return 'Below Average';
    return 'Needs Improvement';
  };

  const calculateStats = () => {
    if (userResults.length === 0) return { avgScore: 0, totalQuizzes: 0, totalTime: 0 };
    
    const avgScore = Math.round(
      userResults.reduce((sum, result) => sum + result.percentage, 0) / userResults.length
    );
    
    const totalTime = userResults.reduce((sum, result) => sum + result.timeTaken, 0);
    
    return {
      avgScore,
      totalQuizzes: userResults.length,
      totalTime
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
          <p className="text-gray-600 mt-2">
            Track your performance and progress over time
          </p>
        </div>

        {userResults.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No quiz results yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Take some quizzes to see your results and track your progress here.
            </p>
            <Button onClick={() => navigate('/dashboard')} size="lg" variant='hologram'>
              <div className='flex items-center'>
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Quizzes
              </div>
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary-100">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.totalQuizzes}
                    </h3>
                    <p className="text-gray-600">Quizzes Taken</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.avgScore}%
                    </h3>
                    <p className="text-gray-600">Average Score</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatTime(stats.totalTime)}
                    </h3>
                    <p className="text-gray-600">Total Time</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {getPerformanceLabel(stats.avgScore)}
                    </h3>
                    <p className="text-gray-600">Performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Results</h2>
              </div>

              <div className="overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {userResults.map((result, index) => (
                    <div key={result.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        {/* Quiz Info */}
                        <div className="flex-1 mb-4 lg:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {result.quizTitle}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {result.createdAt ? new Date(result.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{formatTime(result.timeTaken)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Score Display */}
                        <div className="flex items-center space-x-6">
                          {/* Score Fraction */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {result.score}/{result.totalQuestions}
                            </div>
                            <div className="text-sm text-gray-600">Questions</div>
                          </div>

                          {/* Percentage Badge */}
                          <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold ${getScoreColor(result.percentage)}`}>
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>{result.percentage}%</span>
                          </div>

                          {/* Performance Label */}
                          <div className="text-center min-w-[100px]">
                            <div className="text-sm font-medium text-gray-900">
                              {getPerformanceLabel(result.percentage)}
                            </div>
                            <div className="text-xs text-gray-500">Performance</div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Score Progress</span>
                          <span className="text-sm text-gray-500">{result.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              result.percentage >= 80 ? 'bg-green-500' :
                              result.percentage >= 60 ? 'bg-blue-500' :
                              result.percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Motivational Footer */}
            <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keep Learning! 🚀
              </h3>
              <p className="text-gray-600 mb-4">
                Your average score is {stats.avgScore}%. 
                {stats.avgScore >= 80 
                  ? " Excellent work! You're mastering these topics."
                  : " Keep practicing to improve your knowledge!"
                }
              </p>
              <Button onClick={() => navigate('/dashboard')} variant='hologram'>
                Take More Quizzes
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
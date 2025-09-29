import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { QuizCard } from '@/components/quiz/QuizCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Plus, BookOpen, Users, Trophy, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    quizzes,
    userQuizzes,
    userResults,
    loading,
    fetchQuizzes,
    fetchUserQuizzes,
    fetchUserResults
  } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
    fetchUserQuizzes();
    fetchUserResults();
  }, [fetchQuizzes, fetchUserQuizzes, fetchUserResults]);

  const handleTakeQuiz = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const recentQuizzes = quizzes.slice(0, 6);
  const totalQuizzesTaken = userResults.length;
  const averageScore = userResults.length > 0
    ? Math.round(userResults.reduce((sum, result) => sum + result.percentage, 0) / userResults.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header with Gradient */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl opacity-5"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.username}!
                </h1>
                <p className="text-gray-600 text-lg">
                  Ready to challenge yourself with some quizzes or create a new one?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-400 opacity-60"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {userQuizzes.length}
                </h3>
                <p className="text-gray-600 font-medium">Quizzes Created</p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Your creations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-60"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {totalQuizzesTaken}
                </h3>
                <p className="text-gray-600 font-medium">Quizzes Taken</p>
                <div className="mt-3 flex items-center text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Keep learning!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300">
                  <Trophy className="h-8 w-8 text-amber-600" />
                </div>
                <div className="w-3 h-3 rounded-full bg-amber-400 opacity-60"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {averageScore}%
                </h3>
                <p className="text-gray-600 font-medium">Average Score</p>
                <div className="mt-3 flex items-center text-sm text-amber-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>
                    {averageScore >= 80 ? 'Excellent!' :
                      averageScore >= 60 ? 'Good work!' : 'Keep trying!'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              onClick={handleCreateQuiz}
              variant="hologram"
              size="sm"
              className="py-3 px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <Plus className="h-4 w-4" />
                <span className="font-medium text-sm">Create New Quiz</span>
              </div>
            </Button>

            <Button
              variant="hologram"
              size="sm"
              onClick={() => navigate('/my-quizzes')}
              className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl py-3 px-4 group transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                <span className="font-medium text-sm text-gray-700 group-hover:text-blue-700 transition-colors duration-300">My Quizzes</span>
              </div>
            </Button>

            <Button
              variant="hologram"
              size="sm"
              onClick={() => navigate('/results')}
              className="border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 rounded-xl py-3 px-4 group transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="h-4 w-4 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
                <span className="font-medium text-sm text-gray-700 group-hover:text-amber-700 transition-colors duration-300">View Results</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Available Quizzes Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
              Available Quizzes
            </h2>
            <Button
              variant="hologram"
              onClick={() => navigate('/quizzes')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl px-6 py-3 font-semibold transition-all duration-300 group"
            >
              <div className='flex items-center'>
                <span>View All</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="relative">
                <LoadingSpinner />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          ) : recentQuizzes.length === 0 ? (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
              <div className="relative text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No quizzes available yet
                </h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                  Be the first to create a quiz and share it with others!
                </p>
                <Button
                  onClick={handleCreateQuiz}
                  variant='hologram'
                >
                  <div className='flex items-center'>
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Quiz
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onTakeQuiz={handleTakeQuiz}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Recent Activity */}
        {userResults.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-4"></div>
              Recent Activity
            </h2>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-3xl"></div>
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
                <div className="p-8">
                  <div className="space-y-6">
                    {userResults.slice(0, 5).map((result, index) => (
                      <div key={result.id || index} className="group flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 border border-transparent hover:border-gray-200/50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${result.percentage >= 80 ? 'bg-emerald-400' :
                              result.percentage >= 60 ? 'bg-blue-400' :
                                result.percentage >= 40 ? 'bg-amber-400' : 'bg-red-400'
                            } shadow-lg`}></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-300">
                              {result.quizTitle}
                            </h4>
                            <p className="text-gray-500 mt-1">
                              {result.createdAt && new Date(result.createdAt).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {result.score}/{result.totalQuestions}
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${result.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' :
                              result.percentage >= 60 ? 'bg-blue-100 text-blue-800' :
                                result.percentage >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {result.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {userResults.length > 5 && (
                    <div className="mt-8 text-center">
                      <Button
                        variant="hologram"
                        onClick={() => navigate('/results')}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl px-6 py-3 font-semibold transition-all duration-300 group"
                      >
                        <span>View All Results</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
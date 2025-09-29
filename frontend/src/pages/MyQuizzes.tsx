import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Plus, BookOpen, Clock, FileText, Calendar, Users, Trash2 } from 'lucide-react';

export const MyQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const { userQuizzes, loading, fetchUserQuizzes, deleteQuiz } = useQuizStore();

  useEffect(() => {
    fetchUserQuizzes();
  }, [fetchUserQuizzes]);

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const handleViewQuiz = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId: number, quizTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${quizTitle}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await deleteQuiz(quizId);
      } catch (error) {
        // Error handling is already done in the store with toast
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Quizzes</h1>
            <p className="text-gray-600 mt-2">
              Manage and view your created quizzes
            </p>
          </div>
          <Button
            onClick={handleCreateQuiz}
            className="mt-4 sm:mt-0 flex items-center space-x-2"
            variant='hologram'
          >
            <div className='flex items-center'>
              <Plus className="h-5 w-5 mr-2" />
              Create New Quiz
            </div>
          </Button>
        </div>

        {userQuizzes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No quizzes created yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start creating engaging quizzes to share with others and test knowledge on various topics.
            </p>
            <Button onClick={handleCreateQuiz} size="lg" variant='hologram'>
              <div className='flex items-center'>
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Quiz
              </div>
            </Button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary-100">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {userQuizzes.length}
                    </h3>
                    <p className="text-gray-600">Total Quizzes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {userQuizzes.reduce((total, quiz) => total + quiz.questionCount, 0)}
                    </h3>
                    <p className="text-gray-600">Total Questions</p>
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
                      {Math.round(userQuizzes.reduce((total, quiz) => total + quiz.timeLimit, 0) / userQuizzes.length || 0)}
                    </h3>
                    <p className="text-gray-600">Avg. Time Limit (min)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {userQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {quiz.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {quiz.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {quiz.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{quiz.timeLimit} min</span>
                      </div>

                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{quiz.questionCount} questions</span>
                      </div>

                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>0 taken</span> {/* You can add participation count later */}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                        variant="hologram"
                        size="sm"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                        disabled={loading}
                      >
                        <div className='flex items-center'> 
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Quiz
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Quiz Status Bar */}
                  <div className="px-6 py-3 bg-gray-50 border-t rounded-b-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">
                        ✓ Published
                      </span>
                      <span className="text-gray-500">
                        ID: {quiz.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Another Quiz CTA */}
            <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to create another quiz?
              </h3>
              <p className="text-gray-600 mb-6">
                Share your knowledge and create engaging quizzes for your audience.
              </p>
              <Button onClick={handleCreateQuiz} size="lg" variant='hologram'>
                <div className='flex items-center'>
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Quiz
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
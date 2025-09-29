import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { BookOpen, User, LogOut, Plus, Trophy, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) {
    return (
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">QuizApp</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button size="sm" variant=''>Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" variant=''>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="font-bold text-xl text-gray-900">QuizApp</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/create-quiz"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/create-quiz')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Create Quiz</span>
            </Link>

            <Link
              to="/my-quizzes"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/my-quizzes')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>My Quizzes</span>
            </Link>

            <Link
              to="/results"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/results')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Results</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user?.username}</span>
            </div>
            <Button
              size="sm"
              variant=''
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <div className='flex items-center'>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t pt-4 pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/create-quiz"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/create-quiz')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Create Quiz</span>
            </Link>
            <Link
              to="/my-quizzes"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/my-quizzes')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>My Quizzes</span>
            </Link>
            <Link
              to="/results"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/results')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Results</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
import { Clock, User, FileText, Calendar, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { QuizCardProps } from '@/types';

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onTakeQuiz }) => {
  const handleTakeQuiz = () => {
    if (onTakeQuiz) {
      onTakeQuiz(quiz.id);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Card Header with Gradient */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-7">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
            {quiz.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-4 flex-shrink-0">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {new Date(quiz.createdAt).toLocaleDateString()}
          </div>
        </div>

        {quiz.description && (
          <div className="mb-6">
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {quiz.description}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{quiz.timeLimit} minutes</span>
          </div>
          
          <div className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-200">
            <FileText className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{quiz.questionCount} questions</span>
          </div>

          {quiz.creator && (
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 px-3 py-2 rounded-lg border border-purple-200">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">by {quiz.creator}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleTakeQuiz}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
          size="md"
        >
          <div className="flex items-center justify-center space-x-2">
            <Play className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            <span>Take Quiz</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
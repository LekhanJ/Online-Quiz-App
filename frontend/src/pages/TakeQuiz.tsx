import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { Timer } from '@/components/quiz/Timer';
import { QuizStats } from '@/components/quiz/QuizStats';
import { ResultBreakdown } from '@/components/quiz/ResultBreakdown';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';
import { QuizResult } from '@/types';
import toast from 'react-hot-toast';

export const TakeQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentQuiz, loading, fetchQuiz, submitQuiz } = useQuizStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (id) {
      fetchQuiz(Number(id));
    }
  }, [id, fetchQuiz]);

  const handleAnswerSelect = (answer: number) => {
    if (!currentQuiz?.Questions) return;
    
    const questionId = currentQuiz.Questions[currentQuestionIndex].id;
    if (questionId) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
    }
  };

  const handleNext = () => {
    if (!currentQuiz?.Questions) return;
    
    if (currentQuestionIndex < currentQuiz.Questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!currentQuiz?.Questions || !id) return;

    try {
      setIsSubmitting(true);
      setTimerActive(false);
      
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      
      const result = await submitQuiz(Number(id), {
        answers,
        timeTaken
      });
      
      setQuizResult(result);
      setShowSubmitModal(false);
    } catch (error) {
      toast.error('Failed to submit quiz');
      setTimerActive(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [currentQuiz, id, answers, startTime, submitQuiz]);

  const handleTimeUp = useCallback(() => {
    toast.error("Time's up!");
    handleSubmit();
  }, [handleSubmit]);

  const getAnsweredCount = () => {
    if (!currentQuiz?.Questions) return 0;
    return currentQuiz.Questions.filter(q => q.id && answers[q.id] !== undefined).length;
  };

  const getUnansweredQuestions = () => {
    if (!currentQuiz?.Questions) return [] as NonNullable<typeof currentQuiz>['Questions'];
    return currentQuiz.Questions.filter(q => q.id && answers[q.id] === undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')} variant='hologram'>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (quizResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuizStats result={quizResult} />
          {quizResult.details && quizResult.details.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Breakdown</h2>
              <ResultBreakdown details={quizResult.details} />
            </div>
          )}
          <div className="mt-8 text-center">
            <div className="space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant='hologram'>
                Back to Dashboard
              </Button>
              <Button 
                variant="hologram" 
                onClick={() => navigate('/results')}
              >
                View All Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.Questions?.[currentQuestionIndex];
  const totalQuestions = currentQuiz.Questions?.length || 0;
  const answeredCount = getAnsweredCount();
  const unansweredQuestions = getUnansweredQuestions() ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
              {currentQuiz.description && (
                <p className="text-gray-600 mt-1">{currentQuiz.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-6">
              <Timer 
                timeLimit={currentQuiz.timeLimit}
                onTimeUp={handleTimeUp}
                isActive={timerActive}
              />
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentQuestionIndex + 1} / {totalQuestions}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <div className="mb-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={currentQuestion.id ? answers[currentQuestion.id] ?? null : null}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="hologram"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <div className='flex items-center'>
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </div>
          </Button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} answered
            </span>
            
            <Button
              onClick={() => setShowSubmitModal(true)}
              variant="hologram"
              className="flex items-center space-x-2"
            >
              <div className='flex items-center'>
                <Send className="h-4 w-4" />
                <span>Submit Quiz</span>
              </div>
            </Button>
          </div>

          <Button
            onClick={handleNext}
            variant='hologram'
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="flex items-center space-x-2"
          >
            <div className='flex items-center'>
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Button>
        </div>

        {/* Submit Confirmation Modal */}
        <Modal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          title="Submit Quiz?"
        >
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-gray-900">
                  Are you sure you want to submit your quiz?
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  You have answered {answeredCount} out of {totalQuestions} questions.
                </p>
              </div>
            </div>

            {unansweredQuestions.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>Warning:</strong> You have {unansweredQuestions.length} unanswered question(s). 
                  These will be marked as incorrect.
                </p>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                variant="hologram"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant='hologram'
                loading={isSubmitting}
                className="flex-1"
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

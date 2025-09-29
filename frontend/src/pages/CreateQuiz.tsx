import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateQuizRequest } from '@/types';
import { Plus, Trash2, Save, BookOpen, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuizFormData extends CreateQuizRequest {}

export const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { createQuiz, loading } = useQuizStore();
  const [submitting, setSubmitting] = useState(false);

  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm<QuizFormData>({
    defaultValues: {
      title: '',
      description: '',
      timeLimit: 10,
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit = async (data: QuizFormData) => {
    // Validate questions
    if (data.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    for (let i = 0; i < data.questions.length; i++) {
      const question = data.questions[i];
      if (!question.question.trim()) {
        toast.error(`Question ${i + 1} cannot be empty`);
        return;
      }
      
      const filledOptions = question.options.filter(option => option.trim() !== '');
      if (filledOptions.length < 2) {
        toast.error(`Question ${i + 1} must have at least 2 options`);
        return;
      }

      if (question.correctAnswer >= filledOptions.length || question.correctAnswer < 0) {
        toast.error(`Please select a valid correct answer for question ${i + 1}`);
        return;
      }
    }

    try {
      setSubmitting(true);
      await createQuiz(data);
      navigate('/my-quizzes');
    } catch (error) {
      
    } finally {
      setSubmitting(false);
    }
  };

  const addQuestion = () => {
    append({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error('You must have at least one question');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Create New Quiz
              </h1>
              <p className="text-slate-600 mt-1">
                Build an engaging quiz with multiple choice questions
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10">
            
            {/* Quiz Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Quiz Details</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input
                  label="Quiz Title"
                  placeholder="Enter an engaging quiz title..."
                  error={errors.title?.message}
                  {...register('title', {
                    required: 'Quiz title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 3 characters'
                    }
                  })}
                />

                <div className="relative">
                  <Input
                    label="Time Limit (minutes)"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="10"
                    error={errors.timeLimit?.message}
                    {...register('timeLimit', {
                      required: 'Time limit is required',
                      min: {
                        value: 1,
                        message: 'Time limit must be at least 1 minute'
                      },
                      max: {
                        value: 120,
                        message: 'Time limit cannot exceed 120 minutes'
                      }
                    })}
                  />
                  <Clock className="absolute right-4 top-9 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                  Description (optional)
                </label>
                <textarea
                  className="
                    block w-full px-4 py-3 text-sm
                    border border-slate-200 rounded-xl
                    bg-white/80 backdrop-blur-sm
                    placeholder:text-slate-400 text-slate-700
                    transition-all duration-200 ease-out
                    shadow-sm hover:shadow-md
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                    focus:outline-none focus:bg-white
                    hover:border-slate-300
                    resize-none
                  "
                  rows={4}
                  placeholder="Brief description of your quiz to help participants understand what to expect..."
                  {...register('description')}
                />
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Questions</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {fields.length} question{fields.length !== 1 ? 's' : ''} added
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="hologram"
                  onClick={addQuestion}
                  className="gap-2"
                >
                  <div className='flex items-center'>
                    <Plus className="h-4 w-4" />
                    Add Question
                  </div>
                </Button>
              </div>

              <div className="space-y-6">
                {fields.map((field, questionIndex) => (
                  <div 
                    key={field.id} 
                    className="
                      bg-gradient-to-r from-white to-slate-50/50 
                      border border-slate-200/60 rounded-2xl p-6 
                      shadow-sm hover:shadow-md transition-all duration-200
                    "
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {questionIndex + 1}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">
                          Question {questionIndex + 1}
                        </h3>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="hologram"
                          size="sm"
                          onClick={() => removeQuestion(questionIndex)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      <Input
                        label="Question Text"
                        placeholder="Enter your question here..."
                        error={errors.questions?.[questionIndex]?.question?.message}
                        {...register(`questions.${questionIndex}.question`, {
                          required: 'Question text is required'
                        })}
                      />

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-4 tracking-wide">
                          Answer Options
                        </label>
                        <div className="space-y-3">
                          {[0, 1, 2, 3].map((optionIndex) => (
                            <div key={optionIndex} className="group relative">
                              <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 hover:border-slate-300 transition-all duration-200">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    value={optionIndex}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-slate-300 transition-all"
                                    {...register(`questions.${questionIndex}.correctAnswer`, {
                                      required: 'Please select the correct answer'
                                    })}
                                  />
                                  <span className="ml-3 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                                    {String.fromCharCode(65 + optionIndex)}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <input
                                    className="
                                      block w-full px-3 py-2 text-sm
                                      border-0 bg-transparent
                                      placeholder:text-slate-400 text-slate-700
                                      focus:outline-none focus:ring-0
                                    "
                                    placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}...`}
                                    {...register(`questions.${questionIndex}.options.${optionIndex}`)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.questions?.[questionIndex]?.correctAnswer && (
                          <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-red-600 font-medium">
                              Please select the correct answer
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-slate-100">
              <Button
                type="button"
                variant="hologram"
                onClick={() => navigate('/dashboard')}
                className="order-2 sm:order-1"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                loading={submitting || loading}
                variant='hologram'
                className="gap-2 order-1 sm:order-2"
              >
                <div className='flex items-center'>
                  <Save className="h-4 w-4" />
                  Create Quiz
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
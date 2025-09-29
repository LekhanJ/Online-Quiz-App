import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RegisterRequest } from '@/types';
import { BookOpen, ArrowLeft, Sparkles, UserPlus, Star } from 'lucide-react';

export const Register: React.FC = () => {
  const { register: registerUser, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterRequest & { confirmPassword: string }>();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: RegisterRequest & { confirmPassword: string }) => {
    try {
      setLoading(true);
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password
      });
    } catch (error) {
      // Error is handled by the store and toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Main Card */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                    <BookOpen className="h-12 w-12 text-white" />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="h-2 w-2 text-yellow-800 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
                Join QuizApp!
              </h2>
              <p className="text-gray-600 text-lg mb-2">
                Create your account and start your learning adventure
              </p>
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Username"
                    type="text"
                    autoComplete="username"
                    placeholder="Choose a username"
                    error={errors.username?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('username', {
                      required: 'Username is required',
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters'
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'Username can only contain letters, numbers, and underscores'
                      }
                    })}
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    error={errors.password?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => {
                        if (value !== watch('password')) {
                          return 'Passwords do not match';
                        }
                      }
                    })}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        <span>Create Account</span>
                        <div className="w-2 h-2 bg-white rounded-full opacity-75"></div>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-700 font-medium transition-colors duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to home</span>
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-100/50">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                What you'll get:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Create unlimited quizzes</li>
                <li>• Track your progress and scores</li>
                <li>• Share quizzes with friends</li>
                <li>• Access detailed analytics</li>
              </ul>
            </div>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-8 left-8 opacity-20">
          <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20">
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-500"></div>
        </div>
        <div className="absolute top-1/2 -left-8 opacity-10">
          <Star className="h-8 w-8 text-purple-400 fill-current animate-pulse delay-1000" />
        </div>
      </div>
    </div>
  );
};
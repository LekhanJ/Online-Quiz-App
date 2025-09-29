import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginRequest } from '@/types';
import { BookOpen, ArrowLeft, Sparkles, Lock, User } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data: LoginRequest) => {
    try {
      setLoading(true);
      await login(data);
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
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                    <BookOpen className="h-12 w-12 text-white" />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="h-2 w-2 text-yellow-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-lg">
                Sign in to your account to continue your learning journey
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Or{' '}
                <Link
                  to="/register"
                  className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  create a new account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="relative">
                  <Input
                    label="Username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    error={errors.username?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('username', {
                      required: 'Username is required',
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters'
                      }
                    })}
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
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
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to home</span>
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure SSL Connection</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-8 right-8 opacity-20">
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-20">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { BookOpen, Users, Trophy, Zap, Target, Clock, Star, ArrowRight, Sparkles, Play } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="h-16 w-16 text-white" />
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="h-3 w-3 text-yellow-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Test Your Knowledge
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-4">
                  Create Amazing Quizzes
                  <Star className="h-12 w-12 text-yellow-400 fill-current animate-pulse" />
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Build, share, and take interactive quizzes. Challenge yourself and others with 
                our powerful quiz platform designed for learners and educators.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/register" className="group">
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl py-4 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <span>Get Started Free</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </Link>
              
              <Link to="/login" className="group">
                <Button 
                  variant="hologram" 
                  size="lg" 
                  className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-2xl py-4 px-8 text-lg font-semibold transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="text-gray-700 group-hover:text-blue-700 transition-colors duration-300">Sign In</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-semibold">Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Why Choose QuizApp?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, share, and take quizzes with style and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Easy to Create
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Build quizzes in minutes with our intuitive interface. Add questions, 
                  set time limits, and publish instantly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Share & Collaborate
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your quizzes with friends, students, or colleagues. 
                  Build a community of learners.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Track Progress
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your performance with detailed results and analytics. 
                  See how you improve over time.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Multiple Choice
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create engaging multiple-choice questions with up to 4 options. 
                  Perfect for any subject.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Timed Quizzes
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Add excitement with time limits. Create pressure-free learning 
                  or challenging competitions.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Instant Results
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get immediate feedback with detailed scoring and performance 
                  breakdowns after each quiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Start Learning?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who are already creating and taking quizzes on our platform.
            </p>
            <Link to="/register" className="inline-block group">
              <Button 
                className="bg-white text-blue-700 hover:bg-gray-100 border-0 rounded-2xl py-4 px-8 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                variant='hologram'
              >
                <div className="flex items-center space-x-2">
                  <span>Create Your First Quiz</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative bg-gray-900 text-white py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                QuizApp
              </span>
            </div>
            <div className="text-gray-400 flex items-center space-x-2">
              <span>© 2024 QuizApp. All rights reserved.</span>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
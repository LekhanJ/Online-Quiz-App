// User types
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Quiz types
export interface Question {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: number;
  quizId?: number;
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  timeLimit: number;
  createdAt: string;
  creator?: string;
  questionCount: number;
  Questions?: Question[];
  User?: {
    username: string;
  };
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  timeLimit: number;
  questions: Omit<Question, 'id' | 'quizId'>[];
}
export interface QuizSubmission {
  answers: Record<number, number>;
  timeTaken: number;
}

export interface QuizResult {
  id?: number;
  quizTitle?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  createdAt?: string;
  resultId?: number;
  details?: QuestionResultDetail[];
}

export interface QuestionResultDetail {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
}

// Store types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, user: User) => void;
}

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  userQuizzes: Quiz[];
  userResults: QuizResult[];
  loading: boolean;
  error: string | null;
  fetchQuizzes: () => Promise<void>;
  fetchQuiz: (id: number) => Promise<void>;
  createQuiz: (quiz: CreateQuizRequest) => Promise<void>;
  submitQuiz: (quizId: number, submission: QuizSubmission) => Promise<QuizResult>;
  fetchUserQuizzes: () => Promise<void>;
  fetchUserResults: () => Promise<void>;
  clearError: () => void;
  deleteQuiz: (quizId: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

// Component Props
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface QuizCardProps {
  quiz: Quiz;
  onTakeQuiz?: (id: number) => void;
}

export interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showCorrectAnswer?: boolean;
}

export interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export interface QuizStatsProps {
  result: QuizResult;
}
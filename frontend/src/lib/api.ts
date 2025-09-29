import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  Quiz, 
  CreateQuizRequest, 
  QuizSubmission, 
  QuizResult 
} from '@/types';
import toast from 'react-hot-toast';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const message = error.response?.data?.error || 'An error occurred';
        
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
        } else {
          toast.error(message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await this.client.post<AuthResponse>('/auth/login', credentials);
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const { data } = await this.client.post<AuthResponse>('/auth/register', userData);
    return data;
  }

  // Quiz endpoints
  async getQuizzes(): Promise<Quiz[]> {
    const { data } = await this.client.get<Quiz[]>('/quiz');
    return data;
  }

  async getQuiz(id: number): Promise<Quiz> {
    const { data } = await this.client.get<Quiz>(`/quiz/${id}`);
    return data;
  }

  async createQuiz(quiz: CreateQuizRequest): Promise<{ quiz: Quiz; message: string }> {
    const { data } = await this.client.post<{ quiz: Quiz; message: string }>('/quiz', quiz);
    return data;
  }

  async submitQuiz(quizId: number, submission: QuizSubmission): Promise<QuizResult> {
    const { data } = await this.client.post<QuizResult>(`/quiz/${quizId}/submit`, submission);
    return data;
  }

  async getUserQuizzes(): Promise<Quiz[]> {
    const { data } = await this.client.get<Quiz[]>('/quiz/my-quizzes');
    return data;
  }

  async getUserResults(): Promise<QuizResult[]> {
    const { data } = await this.client.get<QuizResult[]>('/quiz/my-results');
    return data;
  }

  async deleteQuiz(quizId: number): Promise<{ message: string }> {
    const { data } = await this.client.delete<{ message: string }>(`/quiz/${quizId}`);
    return data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const { data } = await this.client.get('/health');
    return data;
  }
}

export const apiClient = new ApiClient();
import { create } from 'zustand';
import { QuizState, CreateQuizRequest, QuizSubmission } from '@/types';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

export const useQuizStore = create<QuizState>((set, get) => ({
  quizzes: [],
  currentQuiz: null,
  userQuizzes: [],
  userResults: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),

  clearError: () => set({ error: null }),

  fetchQuizzes: async () => {
    try {
      set({ loading: true, error: null });
      const quizzes = await apiClient.getQuizzes();
      set({ quizzes, loading: false });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch quizzes';
      set({ error: message, loading: false });
    }
  },

  fetchQuiz: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const quiz = await apiClient.getQuiz(id);
      set({ currentQuiz: quiz, loading: false });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch quiz';
      set({ error: message, loading: false });
      throw error;
    }
  },

  createQuiz: async (quizData: CreateQuizRequest) => {
    try {
      set({ loading: true, error: null });
      const response = await apiClient.createQuiz(quizData);
      
      // Refresh user quizzes
      await get().fetchUserQuizzes();
      
      set({ loading: false });
      toast.success('Quiz created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to create quiz';
      set({ error: message, loading: false });
      throw error;
    }
  },

  submitQuiz: async (quizId: number, submission: QuizSubmission) => {
    try {
      set({ loading: true, error: null });
      const result = await apiClient.submitQuiz(quizId, submission);
      
      // Refresh user results
      await get().fetchUserResults();
      
      set({ loading: false });
      toast.success(`Quiz completed! Score: ${result.score}/${result.totalQuestions}`);
      return result;
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to submit quiz';
      set({ error: message, loading: false });
      throw error;
    }
  },

  fetchUserQuizzes: async () => {
    try {
      set({ loading: true, error: null });
      const userQuizzes = await apiClient.getUserQuizzes();
      set({ userQuizzes, loading: false });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch user quizzes';
      set({ error: message, loading: false });
    }
  },

  deleteQuiz: async (quizId: number) => {
    try {
      set({ loading: true, error: null });
      await apiClient.deleteQuiz(quizId);
      await get().fetchUserQuizzes();
      set({ loading: false });
      toast.success('Quiz deleted successfully');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to delete quiz';
      set({ error: message, loading: false });
      throw error;
    }
  },

  fetchUserResults: async () => {
    try {
      set({ loading: true, error: null });
      const userResults = await apiClient.getUserResults();
      set({ userResults, loading: false });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch user results';
      set({ error: message, loading: false });
    }
  },
}));
import React from 'react';
import { QuestionResultDetail } from '@/types';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

interface ResultBreakdownProps {
  details: QuestionResultDetail[];
}

export const ResultBreakdown: React.FC<ResultBreakdownProps> = ({ details }) => {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Answer Breakdown</h3>
        <p className="text-sm text-gray-600 mt-1">See which questions you got right and wrong</p>
      </div>
      <div className="divide-y divide-gray-100">
        {details.map((d, idx) => {
          const isCorrect = d.isCorrect;
          return (
            <div key={d.id ?? idx} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Question {idx + 1}</span>
                  </div>
                  <p className="text-gray-900 font-medium mb-3">{d.question}</p>
                  <ul className="space-y-2">
                    {d.options.map((opt, i) => {
                      const isTheCorrect = i === d.correctAnswer;
                      const isSelected = d.selectedAnswer === i;
                      const base = 'flex items-center rounded-lg px-3 py-2 border';
                      const style = isTheCorrect
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : isSelected && !isTheCorrect
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-800';
                      return (
                        <li key={i} className={`${base} ${style}`}>
                          <Circle className="h-4 w-4 mr-2 opacity-60" />
                          <span className="mr-2 font-medium">{String.fromCharCode(65 + i)}.</span>
                          <span>{opt}</span>
                          {isSelected && (
                            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700">Your answer</span>
                          )}
                          {isTheCorrect && (
                            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-green-200 text-green-800">Correct</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="min-w-[80px] text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {isCorrect ? 'Right' : 'Wrong'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

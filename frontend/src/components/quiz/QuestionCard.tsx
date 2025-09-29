import { QuestionCardProps } from '@/types';

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  showCorrectAnswer = false
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow-sm">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-75"></span>
            Question {questionNumber}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-relaxed tracking-tight">
          {question.question}
        </h3>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = showCorrectAnswer && index === question.correctAnswer;
          const isWrong = showCorrectAnswer && isSelected && index !== question.correctAnswer;

          let buttonClasses = 'group w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] ';

          if (showCorrectAnswer) {
            if (isCorrect) {
              buttonClasses += 'border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 shadow-lg shadow-emerald-100';
            } else if (isWrong) {
              buttonClasses += 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50 text-red-800 shadow-lg shadow-red-100';
            } else {
              buttonClasses += 'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 opacity-60';
            }
          } else if (isSelected) {
            buttonClasses += 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 shadow-lg shadow-indigo-100';
          } else {
            buttonClasses += 'border-gray-200 bg-gradient-to-r from-white to-gray-50 text-gray-700 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-25 hover:to-purple-25 hover:shadow-md';
          }

          return (
            <button
              key={index}
              onClick={() => !showCorrectAnswer && onAnswerSelect(index)}
              disabled={showCorrectAnswer}
              className={buttonClasses}
            >
              <div className="flex items-center space-x-4">
                <div className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? showCorrectAnswer
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-500 shadow-md'
                        : 'border-red-500 bg-red-500 shadow-md'
                      : 'border-indigo-500 bg-indigo-500 shadow-md'
                    : 'border-gray-300 group-hover:border-indigo-400 group-hover:bg-white'
                }`}>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                  )}
                  {!isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md transition-all duration-200 ${
                      isSelected
                        ? showCorrectAnswer
                          ? isCorrect
                            ? 'bg-emerald-200 text-emerald-800'
                            : 'bg-red-200 text-red-800'
                          : 'bg-indigo-200 text-indigo-800'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">
                      {option}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Zap } from 'lucide-react';
import { TimerProps } from '@/types';

export const Timer: React.FC<TimerProps> = ({ timeLimit, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft <= 60; // Last minute
  const isCritical = timeLeft <= 30; // Last 30 seconds
  const totalTime = timeLimit * 60;
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

  const getTimerStyles = () => {
    if (isCritical) {
      return {
        container: 'text-white bg-gradient-to-r from-red-600 to-rose-600 border-2 border-red-500 shadow-lg shadow-red-200',
        icon: 'text-white',
        text: 'text-white font-black animate-pulse'
      };
    }
    if (isLowTime) {
      return {
        container: 'text-amber-800 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 shadow-lg shadow-amber-200',
        icon: 'text-amber-700',
        text: 'text-amber-900 font-bold'
      };
    }
    return {
      container: 'text-indigo-800 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-lg shadow-indigo-100',
      icon: 'text-indigo-700',
      text: 'text-indigo-900 font-semibold'
    };
  };

  const getProgressColor = () => {
    if (isCritical) return 'bg-gradient-to-r from-red-500 to-rose-500';
    if (isLowTime) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-indigo-500 to-blue-500';
  };

  const styles = getTimerStyles();

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Main Timer Display */}
      <div className={`relative inline-flex items-center space-x-3 px-6 py-4 rounded-2xl font-mono text-xl transition-all duration-300 ${styles.container} ${isCritical ? 'animate-pulse' : ''}`}>
        {/* Background pulse effect for critical time */}
        {isCritical && (
          <div className="absolute inset-0 bg-red-400 rounded-2xl animate-ping opacity-20"></div>
        )}
        
        {/* Icon */}
        <div className="relative z-10">
          {isCritical ? (
            <AlertTriangle className={`h-6 w-6 ${styles.icon} animate-bounce`} />
          ) : isLowTime ? (
            <Zap className={`h-6 w-6 ${styles.icon} animate-pulse`} />
          ) : (
            <Clock className={`h-6 w-6 ${styles.icon}`} />
          )}
        </div>
        
        {/* Time Display */}
        <span className={`relative z-10 ${styles.text} text-2xl tracking-wider`}>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-32 bg-gray-200 rounded-full h-2 shadow-inner overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        {isCritical ? (
          <p className="text-xs font-bold text-red-700 animate-pulse">⚠️ TIME CRITICAL!</p>
        ) : isLowTime ? (
          <p className="text-xs font-semibold text-amber-700">⏰ Almost finished</p>
        ) : (
          <p className="text-xs font-medium text-gray-600">Time remaining</p>
        )}
      </div>
    </div>
  );
};
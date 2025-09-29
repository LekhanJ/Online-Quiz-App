import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neo' | 'fluid' | 'neon' | 'minimal' | 'cyber' | 'organic' | 'hologram';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'neo',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-500 ease-out focus:outline-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none transform-gpu will-change-transform overflow-hidden';

  const variantClasses = {
    neo: `
      bg-slate-100 text-slate-900 border-4 border-slate-300
      shadow-[8px_8px_16px_#b8bcc8,-8px_-8px_16px_#ffffff]
      hover:shadow-[4px_4px_8px_#b8bcc8,-4px_-4px_8px_#ffffff]
      active:shadow-[inset_4px_4px_8px_#b8bcc8,inset_-4px_-4px_8px_#ffffff]
      hover:scale-[0.98] active:scale-95
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
    `,
    
    fluid: `
      bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white
      border-none shadow-2xl hover:shadow-purple-500/25
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-400 before:via-red-400 before:to-yellow-400
      before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-700
      hover:scale-105 active:scale-95
      after:absolute after:inset-0 after:bg-white/10 after:backdrop-blur-sm after:opacity-0 hover:after:opacity-100
      after:transition-opacity after:duration-300
    `,
    
    neon: `
      bg-gray-900 text-cyan-400 border-2 border-cyan-400
      shadow-[0_0_20px_#00ffff40,inset_0_0_20px_#00ffff10]
      hover:shadow-[0_0_30px_#00ffff60,inset_0_0_30px_#00ffff20]
      hover:text-cyan-300 hover:border-cyan-300
      before:absolute before:inset-0 before:bg-cyan-400/5 before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      hover:scale-[1.02] active:scale-95
    `,
    
    minimal: `
      bg-transparent text-gray-700 border-b-2 border-gray-300
      hover:border-gray-800 hover:text-gray-900
      before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gray-800
      hover:before:w-full before:transition-all before:duration-500 before:ease-out
      hover:translate-y-[-2px] active:translate-y-0
      focus:ring-0 focus:border-gray-800
    `,
    
    cyber: `
      bg-black text-lime-400 border border-lime-400
      clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]
      shadow-[0_0_15px_#00ff0040]
      hover:shadow-[0_0_25px_#00ff0060,inset_0_0_15px_#00ff0020]
      hover:text-lime-300 hover:border-lime-300
      before:absolute before:inset-0 before:bg-lime-400/10 before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      transform hover:skew-x-[-2deg] active:skew-x-0
    `,
    
    organic: `
      bg-gradient-to-r from-green-400 to-blue-500 text-white
      border-none shadow-xl hover:shadow-green-500/25
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400 before:to-pink-400
      before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-1000
      hover:rotate-1 active:rotate-0 hover:scale-105 active:scale-95
    `,
    
    hologram: `
      bg-gradient-to-r from-transparent via-white/20 to-transparent text-gray-800
      border border-white/30 backdrop-blur-xl
      shadow-[0_8px_32px_rgba(31,38,135,0.37)]
      hover:shadow-[0_12px_40px_rgba(31,38,135,0.5)]
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/20 before:via-purple-400/20 before:to-pink-400/20
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
      hover:scale-[1.03] active:scale-98
      hover:border-white/50
    `
  };

  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs font-medium rounded-lg min-h-[28px]',
    sm: 'px-4 py-2 text-sm rounded-xl min-h-[36px]',
    md: 'px-6 py-3 text-base rounded-2xl min-h-[44px]',
    lg: 'px-8 py-4 text-lg rounded-2xl min-h-[52px]',
    xl: 'px-10 py-5 text-xl rounded-3xl min-h-[60px]'
  };

  // Special border radius overrides for certain variants
  const borderRadiusOverrides = {
    cyber: 'rounded-none',
    minimal: 'rounded-none',
  };

  const finalSizeClass = borderRadiusOverrides[variant as keyof typeof borderRadiusOverrides] 
    ? sizeClasses[size].replace(/rounded-\w+/, borderRadiusOverrides[variant as keyof typeof borderRadiusOverrides])
    : sizeClasses[size];

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${finalSizeClass} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {/* Animated background effects for certain variants */}
      {variant === 'fluid' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        </>
      )}
      
      {variant === 'hologram' && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      )}

      {/* Content container with loading state */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="relative">
            {variant === 'neon' || variant === 'cyber' ? (
              // Glitch-style loading for tech variants
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-2 border-current animate-ping"></div>
                <div className="absolute inset-0 border-2 border-current animate-pulse"></div>
              </div>
            ) : (
              // Smooth spinner for other variants
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        )}
        
        <span className="relative z-10 whitespace-nowrap">
          {children}
        </span>
      </div>

      {/* Ripple effect for certain variants */}
      {(variant === 'neo' || variant === 'organic') && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-150 transition-transform duration-300 ease-out"></div>
        </div>
      )}
    </button>
  );
};
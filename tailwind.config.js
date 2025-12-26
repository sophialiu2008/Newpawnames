/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4F46E5', // Indigo 600 - 专业起名主色
          secondary: '#6366F1',
          background: '#F8FAFC',
        }
      },
      animation: {
        // 页面向上平滑淡入
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        // 向导步骤横向滑入
        'slide-in': 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        // 微弱的呼吸感动画（用于加载或选中态）
        'subtle-pulse': 'subtlePulse 2s infinite ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}

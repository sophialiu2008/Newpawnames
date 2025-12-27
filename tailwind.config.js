/** @type {import('tailwindcss').Config} */
export default {
  // 指定 Tailwind 处理的文件范围
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 1. 自定义品牌色盘：采用 Indigo (靛蓝) 作为主色，Slate (石板灰) 作为背景中性色
      colors: {
        brand: {
          primary: '#4F46E5',   // Indigo 600 - 用于核心按钮和强调
          secondary: '#6366F1', // Indigo 500 - 用于悬停态或渐变
          accent: '#F43F5E',    // Rose 500 - 用于点缀或警示
          bg: '#F8FAFC',        // Slate 50 - 干净的全局背景色
        },
      },

      // 2. 字体规范：优先调用系统默认字体，确保在 Apple 设备上呈现最佳排版
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },

      // 3. 动画系统：包含页面淡入、横向滑入及微弱呼吸感效果
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-pulse': 'subtlePulse 2s infinite ease-in-out',
        'soft-fade': 'softfade 300ms ease-out forwards',
        'soft-scale': 'softscale 280ms ease-out forwards',
      },

      // 4. 定义动画帧：实现位移与透明度的平滑变化
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        softfade: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softscale: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      // 5. 扩展边框圆角：支持 Apple 风格的大圆角设计
      borderRadius: {
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        '3xl': '2rem',     // 32px
        '4xl': '2.5rem',   // 40px
      },
      
      // 6. 自定义投影：营造极简且有层次感的悬浮效果
      boxShadow: {
        'pro': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'indigo': '0 10px 30px -5px rgba(79, 70, 229, 0.3)',
      }
    },
  },
  plugins: [],
}

/**
 * Firstory Studio Design System - Tailwind Config Extension
 *
 * 使用方式：將此配置合併到你的 tailwind.config.js
 *
 * @example
 * // tailwind.config.js
 * const designSystem = require('./design-system/tailwind.config.extend');
 *
 * module.exports = {
 *   ...designSystem,
 *   content: [...],
 * }
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand - Primary (Coral Pink)
        primary: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F06A6A',  // Main brand color
          600: '#E11D48',
          700: '#BE123C',
        },

        // Semantic - Success
        success: {
          light: '#DCFCE7',
          DEFAULT: '#22C55E',
          dark: '#166534',
        },

        // Semantic - Info
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },

        // Semantic - Warning
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#92400E',
        },

        // Semantic - Error
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#991B1B',
        },
      },

      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },

      spacing: {
        // 4px base system (Tailwind 預設已有，這裡補充常用的)
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
      },

      borderRadius: {
        'sm': '0.25rem',   // 4px - badges, tags
        'DEFAULT': '0.5rem', // 8px - buttons, inputs, cards
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px - modals
      },

      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },

      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },

      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};

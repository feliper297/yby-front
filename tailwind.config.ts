// @ts-nocheck — corePlugins typing mismatch in @types/tailwindcss
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['Roboto Mono', 'Menlo', 'Monaco', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        canvas: '#F2F4F8',
        surface: '#FFFFFF',
        cta: '#0F62FE',
        'cta-hover': '#0043CE',
        accent: '#1890FF',
        'accent-hover': '#40A9FF',
        'accent-down': '#096DD9',
        success: '#52C41A',
        'success-bg': '#F6FFED',
        'success-border': '#B7EB8F',
        warning: '#FAAD14',
        'warning-bg': '#FFFBE6',
        'warning-border': '#FFE58F',
        error: '#FF4D4F',
        'error-bg': '#FFF1F0',
        'error-border': '#FFCCC7',
        info: '#1890FF',
        'info-bg': '#E6F7FF',
        'info-border': '#91D5FF',
        orange: '#FA8C16',
        'orange-bg': '#FFF7E6',
        'orange-border': '#FFD591',
        'border-split': '#F0F0F0',
        'border-default': '#D9D9D9',
        'text-primary': 'rgba(0,0,0,0.85)',
        'text-secondary': 'rgba(0,0,0,0.65)',
        'text-tertiary': 'rgba(0,0,0,0.45)',
        'text-disabled': 'rgba(0,0,0,0.25)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px rgba(0,0,0,0.02)',
        raised: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        sidebar: '2px 0 8px rgba(0,0,0,0.08)',
        overlay: '0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)',
      },
      fontSize: {
        xs: ['11px', '16px'],
        sm: ['12px', '20px'],
        base: ['14px', '22px'],
        md: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['30px', '40px'],
        metric: ['38px', '46px'],
      },
      transitionTimingFunction: {
        antd: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    },
  },
  plugins: [],
  // Prevent Tailwind from conflicting with AntD resets
  corePlugins: {
    preflight: false,
  },
}

export default config

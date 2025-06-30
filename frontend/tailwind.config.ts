// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#040913',
        'dark-blue': '#00253c',
        'blue-100': '#00253c',
        'blue-300': '#040913',
        'neutral-100': '#C5CDD6',
        'neutral-200': '#F1F3F4',
        'neutral-300': '#A8B2BC',
      }
    },
  },
  plugins: [],
}

export default config

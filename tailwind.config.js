/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sb-dark': '#1C1C1C',
        'sb-darker': '#131313',
        'sb-green': '#3ECF8E',
        'sb-slate': '#2E2E2E',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.sb-green'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.sb-green/90'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '1em',
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.sb-green'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.sb-slate'),
              color: theme('colors.white'),
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: theme('colors.gray.800'),
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.sb-green'),
              backgroundColor: theme('colors.gray.50'),
              padding: '1rem',
              borderRadius: '0.25rem',
            },
            'ul > li::marker': {
              color: theme('colors.sb-green'),
            },
            'ol > li::marker': {
              color: theme('colors.sb-green'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '2em',
              marginBottom: '2em',
            },
            table: {
              width: '100%',
              marginTop: '2em',
              marginBottom: '2em',
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.75rem',
              borderBottom: `2px solid ${theme('colors.gray.200')}`,
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottom: `1px solid ${theme('colors.gray.200')}`,
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.sb-green'),
              '&:hover': {
                color: theme('colors.sb-green/90'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.sb-green'),
              backgroundColor: theme('colors.sb-slate'),
            },
            pre: {
              backgroundColor: theme('colors.sb-slate'),
              color: theme('colors.white'),
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              borderLeftColor: theme('colors.sb-green'),
              backgroundColor: theme('colors.sb-slate'),
              color: theme('colors.gray.300'),
            },
            'ul > li::marker': {
              color: theme('colors.sb-green'),
            },
            'ol > li::marker': {
              color: theme('colors.sb-green'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            'thead th': {
              backgroundColor: theme('colors.sb-slate'),
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody td': {
              borderBottomColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
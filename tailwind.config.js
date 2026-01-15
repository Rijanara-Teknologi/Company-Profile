/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media', // Auto-follow system preference (prefers-color-scheme)
    content: [
        "./*.{html,js}",
        "./assets/**/*.{html,js}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#0055FF',
                    cyan: '#00D4FF',
                    dark: '#0f172a',
                    darker: '#020617',
                    card: '#1e293b',
                    border: '#334155',
                },
                text: {
                    main: '#f8fafc',
                    muted: '#94a3b8',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            maxWidth: {
                '7xl': '80rem',
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'pulse-slow': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.8' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}

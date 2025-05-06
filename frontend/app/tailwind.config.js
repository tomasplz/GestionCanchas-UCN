/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					800: '#0A1838',
					900: '#071d40'
				},
				secondary: {
					600: '#153672',
					700: '#122e5e'
				},

				accent: '#4D80E4',
				border: 'hsl(0, 0%, 89.8%)'
			},
			fontFamily: {
				sans: ['Raleway', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			animation: {
				fadeIn: 'fadeIn 0.6s ease-out forwards',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0, transform: 'translateY(10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
}
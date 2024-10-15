/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#633cff",
				secondary: "#beadff",
				tertiary: "#efebff",
				black: "#333333",
				paleGray: "#737373",
				paleNatural: "#d9d9d9",
				milk: "#fafafa",
				danger: "#ff3939",
			},
		},
	},
	plugins: [],
};

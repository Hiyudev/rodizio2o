module.exports = {
	mode: "jit",
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
	variants: {
		extend: {
			typography: ["dark"],
		},
	},
};

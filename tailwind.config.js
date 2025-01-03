/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
		"./node_modules/flowbite/**/*.js" // add this line
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('flowbite/plugin') // add this line
	],
	safelist: [
		'text-red-700', 'border-red-700',
		'text-blue-800', 'border-blue-800',
		'text-yellow-600', 'border-yellow-600',
		'text-green-700', 'border-green-700',
		'text-gray-500', 'border-gray-500',
	],
}


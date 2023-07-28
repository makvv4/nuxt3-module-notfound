require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: [
		'@nuxt/eslint-config',
		'@vue/eslint-config-prettier/skip-formatting',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-console': 'off',
		'no-undef': 'off',
	},
};

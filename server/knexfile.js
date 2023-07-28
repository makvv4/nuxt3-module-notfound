require('dotenv').config({
	path: '../.env',
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = async () => {
	const config = await import('./database/config.mjs');
	return {
		...config.default,
		seeds: {
			directory: './seeds',
		},
	};
};

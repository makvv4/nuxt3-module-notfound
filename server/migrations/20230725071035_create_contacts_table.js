/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('contacts', function (table) {
		table.increments('id').primary();
		table.string('name', 255).notNullable();
		table.string('email', 255);
		table.string('address', 255);
		table.string('phone', 15).notNullable();
		table.tinyint('favorite', 1).defaultTo(0);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('contacts');
};

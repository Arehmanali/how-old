/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.up = async function (knex) {
  await knex.schema.createTable('customers', (table) => {
    table.increments('id').unsigned().notNullable().primary(['customer_job_pkey']);
    table.string('gender', 10).notNullable();
    table.integer('age').notNullable();
    table.string('feeling', 60).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.down = async function (knex) {
  await knex.schema.dropTable('customers');
};

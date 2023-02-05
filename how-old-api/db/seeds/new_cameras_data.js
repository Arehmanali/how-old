/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cameras').insert([
    {
      url: 'https://example.com',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      url: 'https://example2.com',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      url: 'https://example.com',
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      url: 'https://example.com',
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('users').del();
  const hashedPass = await bcrypt.hash('admin1234', 5);
  await knex('users').insert({
    name: 'admin admin',
    email: 'admin@howold.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
    email_verified_at: new Date(),
  });
};

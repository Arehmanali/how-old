const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

async function getUser(id) {
  const [user] = await knex('users').where('id', id).select('email', 'name');
  return user;
}

async function updateUserInfo({ name, username: email }) {
  const [user] = await knex('users')
    .where({ email })
    .update({
      name,
      email,
      updated_at: new Date(),
    })
    .returning(['email', 'name']);
  return user;
}

module.exports = {
  getUser,
  updateUserInfo,
};

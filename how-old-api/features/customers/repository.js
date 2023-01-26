const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

// eslint-disable-next-line camelcase
async function getCustomers(time_period) {
  const customers = await knex('customers').select().where('created_at', '<', time_period);
  return customers;
}

module.exports = {
  getCustomers,
};

const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

// eslint-disable-next-line camelcase
async function getCustomers(fromTime, toTime) {
  let customers = [];
  if (fromTime && toTime) {
    customers = await knex('customers').select().whereBetween('created_at', [fromTime, toTime]);
  } else {
    customers = await knex('customers').select();
  }
  return customers;
}

module.exports = {
  getCustomers,
};

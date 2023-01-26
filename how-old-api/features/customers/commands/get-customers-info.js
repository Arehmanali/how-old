const { getCustomers } = require('../repository');

async function getCustomersInfo(req, res) {
  let customers = [];
  // eslint-disable-next-line camelcase
  const { time_period } = req.headers;

  try {
    customers = await getCustomers(time_period);
  } catch (error) {
    customers = error;
  }

  if (customers && customers.length > 0) {
    req.session.customers = { ...customers };
    return res.send({
      success: true,
      customers: [...customers],
    });
  }

  return res.send({
    success: false,
    customers: [...customers],
  });
}

module.exports = getCustomersInfo;

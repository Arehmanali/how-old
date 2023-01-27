const { getCustomers } = require('../repository');

async function getCustomersInfo(req, res) {
  let customers = [];
  // eslint-disable-next-line camelcase
  const { from_time, to_time } = req.headers;

  try {
    customers = await getCustomers(from_time, to_time);
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

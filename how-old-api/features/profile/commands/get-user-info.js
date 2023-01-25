const { getUser } = require('../repository');

async function getUserInfo(req, res) {
  let user = {};
  const { id } = req.headers;

  try {
    user = await getUser(id);
  } catch (error) {
    user = error;
  }

  if (user.email) {
    req.session.messages = { success: true };
    req.session.userInfo = { ...user };
    return res.send({
      success: true,
      userInfo: { ...user },
    });
  }

  return res.send({
    success: false,
    messages: { errors: { databaseError } },
  });
}

module.exports = getUserInfo;

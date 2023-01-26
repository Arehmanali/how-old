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
    req.session.userInfo = { ...user };
    return res.send({
      success: true,
      userInfo: { ...user },
    });
  }

  return res.send({
    success: false,
  });
}

module.exports = getUserInfo;

const { updateCameraInfo } = require('../repository');

async function updateUser(req, res) {
  let cameras = {};
  try {
    cameras = await updateCameraInfo({ ...req.body });
  } catch (error) {
    cameras = error;
  }

  if (cameras.url) {
    return res.send({
      success: true,
      cameras: { ...cameras },
    });
  }

  return res.send({
    success: false,
  });
}

module.exports = updateUser;

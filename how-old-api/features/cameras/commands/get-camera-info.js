const { getCameras } = require('../repository');

async function getCamerasInfo(req, res) {
  let cameras = [];
  // eslint-disable-next-line camelcase
  const { user_id } = req.headers;
  try {
    cameras = await getCameras(user_id);
  } catch (error) {
    cameras = error;
  }

  if (cameras && cameras.length > 0) {
    req.session.cameras = { ...cameras };
    return res.send({
      success: true,
      cameras: [...cameras],
    });
  }

  return res.send({
    success: false,
  });
}

module.exports = getCamerasInfo;

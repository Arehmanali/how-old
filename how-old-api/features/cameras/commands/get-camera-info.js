const { getCameras } = require('../repository');

async function getCamerasInfo(req, res) {
  let cameras = [];

  try {
    cameras = await getCameras();
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
    cameras: [...cameras],
  });
}

module.exports = getCamerasInfo;

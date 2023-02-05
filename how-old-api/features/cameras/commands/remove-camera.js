const CameraRepo = require('../repository');

async function removeCamera(req, res) {
  let cam = {};
  const { id } = req.headers;
  const registerSuccessMessage = 'Camera deleted from list';
  try {
    cam = await CameraRepo.removeCamera(id);
  } catch (error) {
    cam = error;
  }
  if (cam.id) {
    return res.send({ success: true, messages: { success: registerSuccessMessage } });
  }
  const databaseError = 'Something went wrong.';

  return res.status(500).send({ success: false, messages: { errors: databaseError } });
}

module.exports = removeCamera;

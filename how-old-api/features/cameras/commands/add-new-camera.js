const { addNewCamera } = require('../repository');

async function updateUser(req, res) {
  let cam = {};
  const registerSuccessMessage = 'A New Camera Added';
  try {
    cam = await addNewCamera(req.body);
  } catch (error) {
    cam = error;
  }
  if (cam.id) {
    return res.send({ success: true, camera: cam, messages: { success: registerSuccessMessage } });
  }
  const databaseError = 'Something went wrong.';

  return res.status(500).send({ success: false, messages: { errors: databaseError } });
}

module.exports = updateUser;

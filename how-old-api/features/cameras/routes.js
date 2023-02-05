const { wrap } = require('async-middleware');
const router = require('express').Router();

const getCamerasInfo = require('./commands/get-camera-info');
const addNewCamera = require('./commands/add-new-camera');
const removeCamera = require('./commands/remove-camera');
const requestBodyValidation = require('./commands/verify-request-body');

router.get('/', wrap(getCamerasInfo));
router.post('/add-new-camera', wrap(requestBodyValidation), wrap(addNewCamera));
router.delete('/remove-camera', wrap(removeCamera));

module.exports = router;

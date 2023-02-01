const { wrap } = require('async-middleware');
const router = require('express').Router();

const getCamerasInfo = require('./commands/get-camera-info');

router.get('/', wrap(getCamerasInfo));
module.exports = router;

const { wrap } = require('async-middleware');
const router = require('express').Router();

const getCustomersInfo = require('./commands/get-customers-info');

router.get('/', wrap(getCustomersInfo));
module.exports = router;

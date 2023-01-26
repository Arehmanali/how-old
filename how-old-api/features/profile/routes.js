const { wrap } = require('async-middleware');
const router = require('express').Router();

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const getUserInfo = require('./commands/get-user-info');

router.post('/update-profile-info', wrap(requestBodyValidation), wrap(updateUserInfo));
router.get('/get-user-info', wrap(getUserInfo));
module.exports = router;

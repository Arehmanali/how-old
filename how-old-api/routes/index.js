const express = require('express');

const router = express.Router();

const registerRoutes = require('../features/register/routes');
const loginRoutes = require('../features/login/routes');
const logoutRoutes = require('../features/logout/routes');
const profileRoutes = require('../features/profile/routes');
const customersRoutes = require('../features/customers/routes');
const camerasRoutes = require('../features/cameras/routes');

// Check for authentication
function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.json({ success: false });
}

// Route for getting the session
router.get('/get-session', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.json({ success: true, userInfo: req.user });
  }

  return res.json({ success: false });
});

router.use('/login', loginRoutes);
router.use('/profile', profileRoutes);
router.use('/customers', customersRoutes);
router.use('/cameras', camerasRoutes);
router.use('/logout', isAuthenticated, logoutRoutes);
router.use('/register', registerRoutes);

module.exports = router;

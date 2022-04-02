const router = require('express').Router();

// const apiRoutes = require('/api');
const homeRoutes = require('/home-routes');
const userRoutes = require('/user-routes');

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;

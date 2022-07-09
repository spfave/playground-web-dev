const router = require('express').Router();
const schoolRoutes = require('./school-routes');

router.use('/school', schoolRoutes);

module.exports = router;

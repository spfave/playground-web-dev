const router = require('express').Router();
const {
  getSchools,
  addSchool,
} = require('../../controllers/school-controller');

// prettier-ignore
// <server>/api/schools
router.route('/')
  .get(getSchools)
  .post(addSchool);

module.exports = router;

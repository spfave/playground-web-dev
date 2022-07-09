const { School } = require('../models');

async function getSchools(req, res) {
  try {
    schoolData = await School.find({}).populate('classes').populate({
      path: 'classes',
      populate: 'professor',
    });
    res.status(200).json(schoolData);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function addSchool(req, res) {
  try {
    school = await School.create(req.body);
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { getSchools, addSchool };

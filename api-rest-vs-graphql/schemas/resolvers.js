const { School, Class, Professor } = require('../models');

const resolvers = {
  Query: {
    getSchools: async () => {
      schoolData = await School.find({}).populate('classes').populate({
        path: 'classes',
        populate: 'professor',
      });
      return schoolData;
    },
    classes: async () => {
      return await Class.find({}).populate('professor');
    },
    class: async (parent, args) => {
      return await Class.findById(args.id);
    },
    professors: async () => {
      return await Professor.find({}).populate('classes');
    },
  },
  Mutation: {
    addSchool: async (parent, { name, location, studentCount }) => {
      school = await School.create({ name, location, studentCount });
      return school;
    },
    updateClass: async (parent, { id, building }) => {
      // Find and update the matching class using the destructured args
      return await Class.findOneAndUpdate(
        { _id: id },
        { building },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

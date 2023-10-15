// TODO: Define the query and mutation functionality to work with the Mongoose models ✅
//* Hint: use the functionality in the user-controller.js as a guide 

const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { authMiddleware, signToken } = require("../utils/auth");
// I may not need the authMiddleware to be imported here.

const resolvers = {
  Query: {
    user: async (parent, { _id, username }) => {
      return User.findOne({
        $or: [{ _id }, { username }],
      });
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, username, password }) => {
      const user = await User.findOne({ $or: [{ email }, { username }] });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { _id, bookSchema }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { savedBooks: bookSchema } },
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        throw new AuthenticationError("Couldn't find user with this id!");
      }

      return { updatedUser }
    },
    deleteBook: async (parent, {_id, bookSchema}) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $pull: { savedBooks: bookSchema } },
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        throw new AuthenticationError("Couldn't find user with this id!");
      }

      return { updatedUser }
    }
  },
};

module.exports = resolvers;
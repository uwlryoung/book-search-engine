// TODO: Define the query and mutation functionality to work with the Mongoose models ✅
//* Hint: use the functionality in the user-controller.js as a guide

const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { authMiddleware, signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({
          $or: [{ _id: context.user._id }, { username: context.user.username }],
        });
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {
            $or: [
              { _id: context.user._id },
              { username: context.user.username },
            ],
          },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
      } else {
        throw new AuthenticationError("Couldn't fine user with this id!");
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {
            $or: [
              { _id: context.user._id },
              { username: context.user.username },
            ],
          },
          { $pull: { savedBooks: {bookId: bookId} } },
          { new: true, runValidators: true }
        );
      } else {
        throw new AuthenticationError("Couldn't find user with this id!");
      }
    },
  },
};

module.exports = resolvers;

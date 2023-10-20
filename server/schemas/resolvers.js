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
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Incorrect Credentials");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect Credentials");
        }

        const token = signToken(user);

        return { token, user };
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("Server Error");
      }
    },
    saveBook: async (parent, { bookData }, context) => {
      try {
        console.log(context.user);
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          );
        } else {
          throw new AuthenticationError("Couldn't find user with this id!");
        }
      } catch (e) {
        console.log(e);
        throw new AuthenticationError("Server Error");
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
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, runValidators: true }
        );
      } else {
        throw new AuthenticationError("Couldn't find user with this id!");
      }
    },
  },
};

module.exports = resolvers;

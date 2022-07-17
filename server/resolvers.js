const { gql } = require("apollo-server-express");
const User = require("./models/user.model");

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_, { id, username, email, password }) => {
      const newUser = new User({ id, username, email, password });
      await newUser.save();
      console.log(newUser);
      return newUser;
    },
  },
};

module.exports = resolvers;

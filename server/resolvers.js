const { gql } = require("apollo-server-express");

const resolvers = {
  Query: {
    hello: () => "hi",
  },
};

module.exports = resolvers;

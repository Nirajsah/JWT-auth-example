const { gql } = require("apollo-server-express");
const User = require("./models/user.model");

const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(
      id: ID!
      username: String!
      email: String!
      password: String!
    ): User!
  }
`;

module.exports = typeDefs;

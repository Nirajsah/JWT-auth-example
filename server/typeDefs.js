const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
    posts: [Post]!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Post {
    message: String!
  }
  type loginUser {
    accessToken: String
  }
  type Mutation {
    loginUser(email: String!, password: String!): loginUser
    createUser(
      id: ID!
      username: String!
      email: String!
      password: String!
    ): User!
    updateUser(username: String!, email: String!, password: String!): User!
    deleteUser(email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;

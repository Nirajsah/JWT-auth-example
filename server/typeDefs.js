const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # query to read data from database
  type Query {
    hello: String!
    # users query to retrive all the users from the database
    users: [User!]!
    posts: [Post]!
  }
  # User type same as mongodb model
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Post {
    message: String!
  }
  # jwttoken type
  type loginUser {
    accessToken: String
  }
  # Mutations to create, update and delete users from database
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

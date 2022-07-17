const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
};

app.listen(4000, () => {
  console.log("Server running at 4000");
});

startServer();

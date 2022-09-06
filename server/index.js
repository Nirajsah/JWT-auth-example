const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./typeDefs");
require("dotenv").config();
const mongoose = require("mongoose");
const resolvers = require("./resolvers");
const app = express();

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
    console.log("Connected to Database")
  );
  const PORT = process.env.PORT;
  app.listen(PORT || 3000, () => {
    console.log(`🚀Server running on port ${PORT}`);
  });
})();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
require("dotenv").config();

const connect = require("./config/database");

const schema = require("./schema");
const resolvers = require("./resolvers");

const Book = require("./models/Book");
const User = require("./models/User");

const decode = require("./help/decodeToken");

const app = express();

// database connection
connect();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const userID = decode(token);
      return { Book, User, userID };
    } else {
      return { Book, User };
    }
  }
});

server.applyMiddleware({
  app,
  bodyParserConfig: bodyParser.json(),
  path: "/graphql"
});

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});

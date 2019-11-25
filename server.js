const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
require("dotenv").config();

const connect = require("./config/database");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const Book = require("./models/Book");
const User = require("./models/User");

const decode = require("./help/decodeToken");

const app = express();

// database connection
connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req.headers.authorization && req.headers.authorization !== "null") {
      const token = req.headers.authorization.split(" ")[1];
      const userID = decode(token);
      return { id: userID.id, Book, User };
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

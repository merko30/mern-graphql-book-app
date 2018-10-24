const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const schema = require("./schema");
const resolvers = require("./resolvers");

const Book = require("./models/Book");
const User = require("./models/User");

const decode = require('./help/decodeToken');


const app = express();


mongoose
    .connect(
        "MONGO URL",
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to mLab database");
    })
    .catch(error => console.log("Database connection error: ", error));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const userID = await decode(token);
            return { Book, User, userID }
        } else {
            return { Book, User }
        }
    }
});

server.applyMiddleware({ app, bodyParserConfig: bodyParser.json(), path: "/graphql" });

app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
});

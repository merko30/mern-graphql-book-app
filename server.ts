import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import jwt from "express-jwt";
import path from "path";
import cors from "cors";

require("dotenv").config();

import connect from "./config/database";

(async () => {
  const app = express();

  // database connection
  connect();

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/*.ts`],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(cors());

  app.use(
    "/graphql",
    jwt({
      secret: process.env.JWT_SECRET!,
      credentialsRequired: false,
      algorithms: ["sha1", "RS256", "HS256"],
    })
  );

  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  const port = process.env.PORT || 4000;

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
})();

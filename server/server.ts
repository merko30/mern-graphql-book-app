import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { expressjwt as jwt } from "express-jwt";
import cors from "cors";

require("dotenv").config();

import connect from "./config/database";
import { AuthResolver } from "./resolvers/auth";
import { BookResolver } from "./resolvers/book";

(async () => {
  const app = express();

  // database connection
  connect();

  const schema = await buildSchema({
    resolvers: [AuthResolver, BookResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(cors());

  app.use(
    "/graphql",
    jwt({
      secret: process.env.JWT_SECRET!,
      credentialsRequired: false,
      algorithms: ["RS256", "HS256"],
    })
  );

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
})();

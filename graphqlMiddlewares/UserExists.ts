import { ApolloError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";

import User from "../models/user";

export const UserExists: MiddlewareFn = async ({ args }, next) => {
  const email = await User.countDocuments({ email: args.input.email });

  const username = await User.countDocuments({ username: args.input.username });

  if (email) {
    throw new ApolloError("Email is already taken");
  } else if (username) {
    throw new ApolloError("Username is already taken");
  } else {
    return await next();
  }
};

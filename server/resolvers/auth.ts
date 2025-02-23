import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  Mutation,
  Arg,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { UserExists } from "../graphqlMiddlewares/UserExists";
import {
  BooleanResponse,
  RegisterInput,
  LoginResponse,
  LoginInput,
  User as UserResponse,
} from "../types/user";

import User from "../models/user";

import Context from "../types/context";

@Resolver()
export class AuthResolver {
  @Query(() => UserResponse)
  async me(@Ctx() ctx: Context) {
    return await User.findById(ctx.req.auth!._id);
  }

  @UseMiddleware(UserExists)
  @Mutation((_) => BooleanResponse)
  async register(@Arg("input") input: RegisterInput): Promise<BooleanResponse> {
    const user = new User(input);

    await user.save();
    return {
      ok: true,
    };
  }

  @Mutation((_) => LoginResponse)
  async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    const { emailOrUsername, password } = input;
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new ApolloError("Wrong password");
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
        return {
          token,
          user,
        };
      }
    } else {
      throw new ApolloError("User not found");
    }
  }
}

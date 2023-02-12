import { IsEmail, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

import { UserI } from "../models/user";

@InputType()
export class RegisterInput {
  @Field((_) => String)
  username: string;

  @Field((_) => String)
  @IsEmail()
  email: string;

  @Field((_) => String)
  @MinLength(8)
  password: string;
}

@InputType()
export class LoginInput {
  @Field((_) => String)
  emailOrUsername: string;

  @Field((_) => String)
  password: string;
}

@ObjectType()
export class BooleanResponse {
  @Field((_) => Boolean)
  ok: boolean;
}

@ObjectType()
export class User {
  @Field(() => String)
  username: String;

  @Field(() => String)
  email: String;

  @Field(() => String)
  _id: string;
}

@ObjectType()
export class LoginResponse {
  @Field((_) => String)
  token: string;

  @Field(() => User)
  user: UserI;
}

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  about?: string;
}

@ObjectType()
export class UpdateResponse {
  @Field((_) => String)
  message: string;

  @Field((_) => User)
  user: User;
}

import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

import { Status } from "../models/book";

registerEnumType(Status, {
  name: "Status", // this one is mandatory
});

@ObjectType()
export class Book {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Status)
  status: Status;

  @Field(() => [String])
  authors: string[];

  @Field(() => String)
  thumbnail: string;
}

@InputType()
export class BooksInput {
  @Field(() => Number, { nullable: true })
  perPage?: number;

  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Status, { nullable: true })
  status?: Status;
}

@ObjectType()
export class BooksResponse {
  @Field(() => Number)
  totalPages: number;

  @Field(() => [Book])
  books: Book[];
}

@InputType()
export class AddOrUpdateBookInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Status)
  status: Status;

  @Field(() => [String])
  authors: string[];

  @Field(() => String)
  thumbnail: string;
}

@ObjectType()
export class StatusResponse {
  @Field(() => String, { nullable: true })
  status: string | null;
}

@ObjectType()
export class Author {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
class ImageLinks {
  @Field(() => String, { nullable: true })
  smallThumbnail?: string;
  @Field(() => String, { nullable: true })
  thumbnail?: string;
  @Field(() => String, { nullable: true })
  small?: string;
  @Field(() => String, { nullable: true })
  medium?: string;
  @Field(() => String, { nullable: true })
  large?: string;
  @Field(() => String, { nullable: true })
  extraLarge?: string;
}

@ObjectType()
class VolumeInfo {
  @Field(() => String)
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  description: string;

  @Field(() => [String], {
    nullable: true,
  })
  authors: [string];

  @Field(() => Number, { nullable: true })
  averageRating: number;

  @Field(() => Number, {
    nullable: true,
  })
  ratingsCount: Number;

  @Field(() => String, {
    nullable: true,
  })
  publisher: string;

  @Field(() => String, {
    nullable: true,
  })
  publishedDate: string;

  @Field(() => Number)
  pageCount: number;

  @Field(() => String, { nullable: true })
  mainCategory: string;

  @Field(() => [String], {
    nullable: true,
  })
  categories: [string];

  @Field(() => ImageLinks, { nullable: true })
  imageLinks: ImageLinks;
}

@ObjectType()
export class GoogleBook {
  @Field(() => String)
  id: string;

  @Field(() => VolumeInfo)
  volumeInfo: VolumeInfo;
}

@ObjectType()
export class CountResponse {
  @Field(() => Number)
  [Status.wishlist]: number;

  @Field(() => Number)
  [Status.reading]: number;

  @Field(() => Number)
  [Status.read]: number;
}

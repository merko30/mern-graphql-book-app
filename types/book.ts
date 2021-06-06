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
  @Field(() => Number)
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
class VolumeInfo {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  authors: [string];

  @Field(() => Number)
  averageRating: number;

  @Field(() => Number)
  ratingsCount: Number;
}

@ObjectType()
export class GoogleBook {
  @Field(() => String)
  id: string;

  @Field(() => VolumeInfo)
  volumeInfo: VolumeInfo;
}

@ObjectType()
export class GoodreadsBookDetails {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  ratings_count: number;

  @Field(() => String)
  title: string;

  @Field(() => Number)
  average_rating: number;

  @Field(() => Number)
  num_pages: number;

  @Field(() => [Author])
  authors: Author[];

  @Field(() => String)
  description: string;

  @Field(() => String)
  image_url: string;

  @Field(() => String)
  small_image_url: string;

  @Field(() => [GoogleBook])
  similar_books: GoogleBook[];

  @Field(() => String)
  publisher: string;

  @Field(() => Date, { nullable: true })
  publication_date?: Date;
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

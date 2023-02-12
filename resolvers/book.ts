import { FilterQuery } from "mongoose";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import Book, { Book as BookI, Status } from "../models/book";

import {
  AddOrUpdateBookInput,
  BooksInput,
  BooksResponse,
  Book as BookResponse,
  StatusResponse,
  GoogleBook,
  CountResponse,
} from "../types/book";

import Context from "../types/context";

import { BooleanResponse } from "../types/user";

interface GoogleResponse {
  items: Array<any>;
}

@Resolver()
export class BookResolver {
  @Query((_) => BooksResponse)
  async books(
    @Ctx() ctx: Context,
    @Arg("input", {
      validate: false,
      defaultValue: {
        perPage: 15,
        page: 1,
      },
    })
    input?: BooksInput
  ) {
    const { perPage, page, status } = input!;

    const query: FilterQuery<
      Pick<BookI, "_id" | "title" | "authors" | "status" | "user" | "thumbnail">
    > = { user: ctx.req.user?._id };

    if (status) {
      query.status = status;
    }

    const limit = perPage!;
    const skip = page! * perPage! - perPage!;

    const count = await Book.countDocuments({ user: ctx.req.user?._id });
    const books = await Book.find(query).skip(skip).limit(limit!);

    return {
      totalPages: Math.ceil(count / perPage!),
      books,
    };
  }

  @Mutation((_) => BookResponse)
  async addOrUpdateBook(
    @Arg("input") input: AddOrUpdateBookInput,
    @Ctx() ctx: Context
  ) {
    const book = await Book.findOneAndUpdate(
      { _id: input.id },
      { ...input, user: ctx.req.user?._id },
      { upsert: true, new: true }
    );

    return book;
  }

  @Query((_) => StatusResponse)
  async checkBook(
    @Arg("id") id: String,
    @Ctx() ctx: Context
  ): Promise<StatusResponse> {
    const book = await Book.findOne({
      _id: id,
      user: ctx.req.user!._id,
    });
    if (book) {
      return { status: book.status };
    } else {
      return { status: null };
    }
  }

  @Query(() => GoogleBook)
  async getSingleBook(@Arg("id") id: string) {
    const response = await fetch(
      `${process.env.GOOGLE_BOOKS_API_BASE_URL}/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const book = await response.json();

    return book;
  }

  @Query(() => [GoogleBook])
  async search(@Arg("term") term: string) {
    const response = await fetch(
      `${process.env.GOOGLE_BOOKS_API_BASE_URL!}/?q=${term}&key=${process.env
        .GOOGLE_BOOKS_API_KEY!}`
    );

    const results = (await response.json()) as GoogleResponse;

    return results.items;
  }

  @Mutation(() => BooleanResponse)
  async deleteBook(@Arg("id") id: string): Promise<BooleanResponse> {
    await Book.findOneAndDelete({ id });
    return {
      ok: true,
    };
  }

  @Query(() => CountResponse)
  async counts(@Ctx() { req }: Context) {
    const wishlist = await Book.countDocuments({
      user: req.user!._id,
      status: Status.wishlist,
    });
    const reading = await Book.countDocuments({
      user: req.user!._id,
      status: Status.reading,
    });
    const read = await Book.countDocuments({
      user: req.user!._id,
      status: Status.read,
    });

    return {
      wishlist,
      reading,
      read,
    };
  }
}

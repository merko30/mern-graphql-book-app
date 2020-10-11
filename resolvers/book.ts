import { MongooseFilterQuery } from "mongoose";
import fetch from "node-fetch";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import xml2js from "xml2js";
import parseISO from "date-fns/parseISO";

const trimPhoto = (url: string) => {
  if (!url.includes("nophoto")) {
    let f = url.split(".").slice(-2, -1).join("");

    return url.replace(`${f}.`, "");
  } else {
    return url;
  }
};

import Book, { Book as BookI, Status } from "../models/book";

import {
  AddOrUpdateBookInput,
  BooksInput,
  BooksResponse,
  Book as BookResponse,
  StatusResponse,
  GoodreadsBook,
  GoodreadsBookDetails,
  CountResponse,
} from "../types/book";

import Context from "../types/context";

import { BooleanResponse } from "../types/user";

@Resolver()
export class BookResolver {
  @Query((_) => BooksResponse)
  async books(@Ctx() ctx: Context, @Arg("input") input: BooksInput) {
    const { perPage = 15, page = 1, status } = input;

    const query: MongooseFilterQuery<Pick<
      BookI,
      "_id" | "title" | "authors" | "status" | "user" | "thumbnail"
    >> = { user: ctx.req.user?._id };

    if (status) {
      query.status = status;
    }

    const limit = perPage;
    const skip = page * perPage - perPage;

    const count = await Book.countDocuments({ user: ctx.req.user?._id });
    const books = await Book.find(query).skip(skip).limit(limit);

    return {
      totalPages: Math.ceil(count / perPage),
      books,
    };
  }

  @Mutation((_) => BookResponse)
  async addOrUpdateBook(
    @Arg("input") input: AddOrUpdateBookInput,
    @Ctx() ctx: Context
  ) {
    const book = await Book.findOneAndUpdate(
      { id: input.id },
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
      id,
      user: ctx.req.user!._id,
    });
    if (book) {
      return { status: book.status };
    } else {
      return { status: null };
    }
  }

  @Query(() => GoodreadsBookDetails)
  async getSingleBook(@Arg("id") id: string) {
    const response = await fetch(
      `${process.env.GOODREADS_API_BASE_URL}/book/show/${id}?key=${process.env.GOODREADS_API_KEY}`,
      { method: "GET" }
    );

    const xml = await response.text();

    let book;

    xml2js.parseString(
      xml,
      { trim: true, explicitArray: false, ignoreAttrs: true },
      (err, data) => {
        if (err) {
          throw new Error("Something went wrong");
        }

        const response = data.GoodreadsResponse.book;

        const addzero = (d: string) => (parseInt(d) < 10 ? `0${d}` : d);

        if (
          !response.publication_year ||
          !response.publication_day ||
          !response.publication_month
        ) {
          response.publication_date = null;
        } else {
          response.publication_date = parseISO(
            `${response.publication_year}-${addzero(
              response.publication_month
            )}-${addzero(response.publication_day)}T11:30:30`
          );
        }

        Object.entries(response.authors).map((t) => {
          if (Array.isArray(t[1])) {
            response.authors = [...t[1]];
          } else {
            response.authors = [t[1]];
          }
        });

        response.image_url = trimPhoto(response.image_url);
        response.small_image_url = trimPhoto(response.small_image_url);

        // @ts-ignore
        response.similar_books = response.similar_books.book.map((b) => ({
          ...b,
          image_url: trimPhoto(b.image_url),
        }));

        book = response;
      }
    );

    return book;
  }

  @Query(() => [GoodreadsBook])
  async search(@Arg("term") term: string) {
    const response = await fetch(
      `${process.env
        .GOODREADS_API_BASE_URL!}/search/index.xml?&q=${term}&key=${process.env
        .GOODREADS_API_KEY!}`,
      { method: "GET" }
    );

    const xml = await response.text();

    let results;

    xml2js.parseString(
      xml,
      { explicitArray: false, normalize: true, ignoreAttrs: true },
      (err, data) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        const response = data.GoodreadsResponse.search.results.work.map(
          // @ts-ignore no-implicit-any
          ({ best_book, ...rest }) => ({
            ...rest,
            ...best_book,
          })
        );

        results = response;
      }
    );

    return results;
  }

  @Mutation(() => BooleanResponse)
  async deleteBook(@Arg("id") id: string): Promise<BooleanResponse> {
    await Book.findOneAndDelete({ id });
    return {
      ok: true,
    };
  }

  @Query(() => CountResponse)
  async counts(@Ctx() {req}: Context) {
    const wishlist = await Book.countDocuments({ user:req.user!._id,status: Status.wishlist });
    const reading = await Book.countDocuments({ user:req.user!._id,status: Status.reading });
    const read = await Book.countDocuments({ user:req.user!._id,status: Status.read });

    return {
      wishlist,
      reading,
      read,
    };
  }
}

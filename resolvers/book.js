const resolvers = {
  Query: {
    books: async (_, { status, page = 1, perPage = 15 }, { id, Book }, ___) => {
      if (!id) {
        throw new Error("Unauthorized");
      }
      const limit = perPage;
      const skip = page * perPage - perPage;
      const query = { userId: id };

      if (status) {
        query.status = status;
      }
      const books = await Book.find(query)
        .limit(limit)
        .skip(skip);

      const count = await Book.countDocuments();
      const totalPages = Math.ceil(count / perPage);

      return {
        books,
        totalPages
      };
    }
  },

  Mutation: {
    addBook: async (_, args, context, __) => {
      if (context.id) {
        const user = await context.User.findOne({ _id: context.id });
        const book = await context.Book.create(args);
        book.userId = user.id;

        await book.save();

        return { book };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
    },
    changeStatus: async (obj, { id, status }, context, info) => {
      if (context.id) {
        const book = await context.Book.findOne({ _id: id });

        book.status = status;
        await book.save();

        return { book };
      } else {
        throw new AuthenticationError("Unauthorized");
      }
    },
    deleteBook: async (obj, { id }, context, info) => {
      if (context.id) {
        await context.Book.findOneAndDelete({ bookID: id });

        return { ok: true };
      } else {
        throw new AuthenticationError("Unauthorized");
      }
    }
  },
  BooksResponse: {
    async counts(_, __, { id, Book }) {
      return {
        wishlist: await Book.countDocuments({ userId: id, status: "Wishlist" }),
        reading: await Book.countDocuments({
          userId: id,
          status: "Currently Reading"
        }),
        read: await Book.countDocuments({ userId: id, status: "Read" })
      };
    }
  }
};

module.exports = resolvers;
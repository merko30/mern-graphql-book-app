const resolvers = {
  Query: {
    counts: async (_, __, { Book }, ___) => {
      const wishlistCount = await Book.countDocuments({ status: "Wishlist" });
      const readingCount = await Book.countDocuments({
        status: "Currently reading"
      });
      const readCount = await Book.countDocuments({ status: "Read" });

      return { wishlistCount, readingCount, readCount };
    }
  },
  Mutation: {
    addBook: async (_, args, context, __) => {
      if (context.userID.id) {
        const user = await context.User.findOne({ _id: context.userID.id });
        const book = await context.Book.create(args);
        await user.books.push(book._id);

        await user.save();

        return { book, message: "Book Added" };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
    },
    changeStatus: async (obj, { id, status }, context, info) => {
      if (context.userID.id) {
        const book = await context.Book.findOne({ _id: id });

        book.status = status;
        await book.save();

        return { book, message: "Book status changed" };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
    },
    deleteBook: async (obj, { id }, context, info) => {
      if (context.userID) {
        const user = await context.User.findOne({ _id: context.userID.id });

        await context.Book.findOneAndDelete({ _id: id });

        await user.books.filter(book => book._id !== id);

        user.save();

        return { message: "Book deleted" };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
    }
  }
};

module.exports = resolvers;

const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    me: async (_, __, { id, User, Book }, ___) => {
      if (id) {
        const { _id, username, email, books } = await User.findOne({
          _id: id
        }).populate("books");
        const wishlistCount = await Book.countDocuments({ status: "Wishlist" });
        const readingCount = await Book.countDocuments({
          status: "Currently reading"
        });
        const readCount = await Book.countDocuments({ status: "Read" });
        return {
          _id,
          username,
          email,
          books,
          wishlistCount,
          readingCount,
          readCount
        };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
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

    register: async (_, { username, email, password }, { User }, __) => {
      const user = await User.findOne({
        $or: [{ username }, { email }]
      });
      if (user) {
        throw new AuthenticationError("User alredy exists");
      } else {
        await User.create({
          username,
          email,
          password
        });
        return { ok: true };
      }
    },
    login: async (_, { email, password }, { User }, __) => {
      const user = await User.findOne({ email: email }).populate(
        "books",
        "books.author"
      );
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      if (user) {
        if (user.isValidPassword(password)) {
          const token = user.createToken();
          return { token, user };
        } else {
          throw new AuthenticationError("Passwords don't match");
        }
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

        const bookIndex = user.books.findIndex(b => b._id == id);

        await context.Book.findOneAndDelete({ _id: id });

        await user.books.splice(bookIndex, 1);

        user.save();

        return { message: "Book deleted" };
      } else {
        throw new AuthenticationError("You are not logged in");
      }
    }
  }
};

module.exports = resolvers;

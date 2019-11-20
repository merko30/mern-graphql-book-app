const resolvers = {
  Query: {
    me: async (_, __, { id, User, Book }, ___) => {
      if (id) {
        const { _id, username, email, books } = await User.findOne({
          _id: id
        }).populate("books");

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
    }
  }
};

module.exports = resolvers;

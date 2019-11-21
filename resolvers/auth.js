const resolvers = {
  Query: {
    me: async (_, __, { id, User }, ___) => {
      if (id) {
        return await User.findOne({
          _id: id
        });
      } else {
        throw new Error("Unauthorized");
      }
    }
  },
  Mutation: {
    register: async (_, { username, email, password }, { User }, __) => {
      const user = await User.findOne({
        $or: [{ username }, { email }]
      });
      if (user) {
        throw new Error("User alredy exists");
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
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }
      if (user) {
        if (user.isValidPassword(password)) {
          const token = user.createToken();
          return { token, user };
        } else {
          throw new Error("Wrong password");
        }
      }
    }
  }
};

module.exports = resolvers;

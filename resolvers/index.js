const auth = require("./auth");
const book = require("./book");

const resolvers = {
  Query: {
    ...book.Query,
    ...auth.Query
  },
  Mutation: {
    ...book.Mutation,
    ...auth.Mutation
  }
};

module.exports = resolvers;

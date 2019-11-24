const path = require("path");

const { fileLoader, mergeResolvers } = require("merge-graphql-schemas");

const resolversArray = fileLoader(path.join(__dirname, "./**"), {
  extensions: [".js"],
  recursive: true
  // globOptions: { ignore: ["**/data/**", "**/*.test.js"] }
});

const resolvers = mergeResolvers(resolversArray);

module.exports = resolvers;

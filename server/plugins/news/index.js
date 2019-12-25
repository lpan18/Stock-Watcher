const requireText = require("require-text");

module.exports = {
  resolvers: {
    Query: require("./resolvers")
  },
  schema: requireText("./schema.gql", require)
};

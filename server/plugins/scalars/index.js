const requireText = require("require-text");

module.exports = {
  resolvers: {
    JSON: require("./resolvers/json_resolver"),
    DateTime: require("./resolvers/date_resolver"),
  },
  schema: requireText("./schema.gql", require)
};

const requireText = require('require-text');

module.exports = {
  resolvers: {
    JSON: require('./resolvers')
  },
  schema: requireText('./schema.gql', require)
};

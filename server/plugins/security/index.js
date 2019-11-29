const requireText = require('require-text');

module.exports = {
  resolvers: require('./resolvers'),
  schema: requireText('./schema.gql', require)
};
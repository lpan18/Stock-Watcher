const requireText = require('require-text');

module.exports = {
  resolvers: {
      // Query:  require('./query_resolver'),
      Mutation: require('./mutation_resolver')  
  },
  schema: requireText('./schema.gql', require)
};
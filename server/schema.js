const requireText = require('require-text'),
  R = require('ramda'),
  makeExecutableSchema = require('graphql-tools').makeExecutableSchema,
  plugins = [
    require('./plugins/security'),
    require('./plugins/profile'),
    require('./plugins/company_financial'),
    require('./plugins/company_key_metrics'),
    require('./plugins/stock_price'),
    require('./plugins/major_indexes'),
    require('./plugins/sector_performance'),
    require('./plugins/scalars')
  ]

const typeDefs = R.reduce(R.concat, '', R.map(plugin => plugin.schema || '', plugins)) + requireText('./schema.gql', require);
const resolvers = R.reduce(R.mergeDeepRight,
  {
    Query: { meta: (parent, args, context) => context.meta },
    Mutation: { meta: (parent, args, context) => context.meta }
  },
  R.map(plugin => plugin.resolvers || {}, plugins));
module.exports = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
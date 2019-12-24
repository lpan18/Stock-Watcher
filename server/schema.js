const requireText = require('require-text'),
  R = require('ramda'),
  makeExecutableSchema = require('graphql-tools').makeExecutableSchema,
  // addDirectiveResolveFunctionsToSchema = require('graphql-directive')
  // .addDirectiveResolveFunctionsToSchema,
  plugins = [
    require('./plugins/meta'),
    require('./plugins/security'),
    require('./plugins/profile'),
    require('./plugins/company_financial'),
    require('./plugins/company_key_metrics'),
    require('./plugins/stock_price'),
    require('./plugins/major_indexes'),
    require('./plugins/sector_performance'),
    require('./plugins/scalars'),
    require('./plugins/authentication'),
    require('./plugins/watch'),
    require('./plugins/news'),
    require('./plugins/exchange')
  ]

const typeDefs = R.reduce(R.concat, '', R.map(plugin => plugin.schema || '', plugins)) + requireText('./schema.gql', require);
const resolvers = R.reduce(
  R.mergeDeepRight,
  {},
  R.map(plugin => plugin.resolvers || {}, plugins)
);

// const directives = R.mergeAll(
//     R.values(
//       R.reduce(
//         R.mergeDeepLeft,
//         {},
//         R.map(plugin => plugin.directives || {}, plugins)
//       )
//     )
//   );
  
  let executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
  
  // // load directive resolvers
  // addDirectiveResolveFunctionsToSchema(executableSchema, directives);
  
  module.exports = executableSchema;

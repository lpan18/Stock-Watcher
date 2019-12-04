module.exports = {
  Query: {
    security: (parent, args, context, info) => {      
      return {
        symbol: args.symbol,
      }
    }
  }
};


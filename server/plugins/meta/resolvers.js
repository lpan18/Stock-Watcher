module.exports = {
    Query: {
      meta: (parent, args, context) => {
        context.transactionName = 'Meta';
        return context.meta;
      }
    },
  
    Mutation: {
      meta: (parent, args, context) => {
        context.transactionName = 'Meta';
        return context.meta;
      }
    }
  };
  
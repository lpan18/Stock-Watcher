const dig = require("object-dig"),
  stockPriceHelper = require("./helper");

const majorIndexesResolver = (parent, args, context, info) => {
  const url = stockPriceHelper.majorIndexesURL;
  return context
    .fetch(url)
    .then(response => {
      const major_indexes = dig(response || {}, "majorIndexesList");
      return major_indexes;
    })
    .catch(() => null);
};

module.exports = {
  Security: {
    major_indexes: majorIndexesResolver
  }
};

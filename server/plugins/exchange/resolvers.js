const dig = require("object-dig"),
  exchangeHelper = require("./helper");

const exchangeResolver = (parent, args, context, info) => {
  const url = exchangeHelper.exchangeURL;
  return context
    .fetch(url)
    .then(response => {
      return dig(response, "forexList");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  exchange: exchangeResolver
};
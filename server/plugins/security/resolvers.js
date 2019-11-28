const dig = require("object-dig"),
  R = require('ramda'),
  config = require("config"),
  profileHelper = require("./helper")

const get_profile = (args, context) => {
  const url = profileHelper.profileURL(args.symbol);
  return context
    .fetch(url)
    .then(response => {
      let res = response || {};
      return dig(res, "profile") || {};
    })
    .catch(() => null);
}

module.exports = {
  Query: {
    security: (parent, args, context, info) => {      
      return {
        symbol: args.symbol,
        profile: get_profile(args, context)
      }
    }
  }
};


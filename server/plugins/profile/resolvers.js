const dig = require("object-dig"),
  profileHelper = require("./helper");

const profileResolver = (parent, args, context) => {
  const url = profileHelper.profileURL(parent.symbol);
  return context
    .fetch(url)
    .then(response => {
      let res = response || {};
      return dig(res, "profile") || {};
    })
    .catch(() => null);
};

module.exports = {
  Security: {
    profile: profileResolver
  }
};

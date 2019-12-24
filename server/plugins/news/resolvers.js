const dig = require("object-dig"),
  newsHelper = require("./helper");

const newsResolver = (parent, args, context, info) => {
  const url = newsHelper.newsURL;
  return context
    .fetch(url)
    .then(response => {
      if (dig(response, "status") != "ok") throw new Error("News API Error")
      return dig(response, "articles").slice(0, 5);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  news: newsResolver
};
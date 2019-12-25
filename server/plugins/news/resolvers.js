const dig = require("object-dig"),
  newsHelper = require("./helper");

const newsResolver = (parent, args, context, info) => {
  const url = newsHelper.newsURL;
  return context
    .fetch(url)
    .then(response => {
      if (dig(response, "status") != "ok") throw new Error("News API Error");
      return removeDuplicatesBy(x => x.title, dig(response, "articles")).slice(0, 10);    
    }).catch(err => console.log(err));
};

function removeDuplicatesBy(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(x) {
    var key = keyFn(x), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

module.exports = {
  news: newsResolver
};

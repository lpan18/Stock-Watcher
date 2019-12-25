const request = require("request"),
  P = require("bluebird"),
  requestAsync = P.promisify(request),
  R = require("ramda"),
  HttpsAgent = require("agentkeepalive").HttpsAgent,
  httpsAgent = new HttpsAgent(),
  defaultOptions = {
    method: "GET",
    agent: httpsAgent,
    gzip: true,
    json: false,
    time: true,
    timeout: 1000
  },
  HTTPError = require("apollo-errors").createError("HTTPError", {
    data: { code: 500 },
    message: "HTTP Error",
    options: { showPath: true, showLocations: true }
  });

function addMeta(context, obj) {
  if (context.meta && context.meta.push) {
    context.meta.push(obj);
  }
}

function req(url, options) {
  return requestWithContext(this, url, options);
}

function requestWithContext(context, url, options) {
  options = R.mergeAll([defaultOptions, { uri: url }, options]);
  return requestAsync(options)
    .then(res => {
      let callMeta = {
        url: url,
        body: options.body,
        timings: res.timingPhases,
        method: options.method
      };
      addMeta(context, callMeta)
      const body = JSON.parse(res.body);
      if (body.hasOwnProperty("meta")) {
        callMeta.meta = body.meta;
      }
      return body;
    })
    .catch(err => {
      addMeta(context, { name: err.name, message: err.message });
      throw new HTTPError({
        data: { error: err.name, message: err.message, url: url }
      });
    });
}

module.exports = {
  fetch: req
};

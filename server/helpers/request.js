const request = require('request'),
      P = require('bluebird'),
      requestAsync = P.promisify(request),
      HttpsAgent = require('agentkeepalive').HttpsAgent,
      httpsAgent = new HttpsAgent(),
      mergeAll = require('ramda').mergeAll,
      defaultOptions = {
        method: 'GET',
        agent: httpsAgent,
        gzip: true,
        json: false,
        time: true,
        timeout: 1000
      },
      HTTPError = require('apollo-errors').createError('HTTPError', {
        data: { code: 500 },
        message: 'HTTP Error',
        options: { showPath: true, showLocations: true }
      });


function addMeta(context, obj) {
  if (context.meta && context.meta.push) {
    context.meta.push(obj);
  }
}

function mergeOptions(options,url) {
  return mergeAll([defaultOptions,{ uri: url}, options]);
}

function throw_error(response, parseError) {
  if (response.statusCode === 200) {
    throw parseError;
  }

  const error = new Error(`${response.body}`);
  error.name = `HTTP Error ${response.statusCode}`;

  throw error;
}

function requestWithContext(context, url, options) {
  options = mergeOptions(options,url);
  return requestAsync(options).then(res => {
    let callMeta = { url: url, body: options.body, timings: res.timingPhases, method: options.method };
    addMeta(context, callMeta);

    let body;
    try {
      body = JSON.parse(res.body);
    }
    catch (err) {
      throw_error(res, err);
    }
    if (body.hasOwnProperty('meta')) {
      callMeta.meta = body.meta;
    }
    return body;
  }).catch(err => { 
    addMeta(context, { name: err.name, message: err.message });
    throw new HTTPError({ data: { error: err.name, message: err.message, url: url } });
  });
}

function req(url, options) {
  return requestWithContext(this, url, options);
}

module.exports = {
  fetch: req
};

const config = require("config"),
  request = require("./request"),
  hostname = require("os").hostname(),
  pool = require("../db/pg_adaptor");

const createContext = req => {
  const context = {
    meta: [{ start_time: process.hrtime(), host: hostname }],
    fetch: request.fetch,
    config: config,
    pool: pool
  };
  req.context = context;
  return context;
};

module.exports = {
  createContext
};

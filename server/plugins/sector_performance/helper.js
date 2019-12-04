const config = require("config"),
sector_performance_url = config.sector_performance.url

const apikey = config.api_key

module.exports = {
  sectorPerformURL: `${sector_performance_url}&apikey=${apikey}`
};

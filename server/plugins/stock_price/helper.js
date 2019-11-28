const config = require("config"),
stock_intraday_url = config.stock_price.intraday.url,
stock_daily_url = config.stock_price.daily.url,
major_indexes_url = config.stock_price.major_indexes.url,
sector_performance_url = config.stock_price.sector_performance.url

const apikey = config.api_key

module.exports = {
  stockIntradayURL: (companySymbol,interval, outputsize) => {
    return `${stock_intraday_url}&symbol=${companySymbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apikey}`;
  },
  stockDailyURL: (companySymbol, outputsize) => {
    return `${stock_daily_url}&symbol=${companySymbol}&outputsize=${outputsize}&apikey=${apikey}`;
  },
  majorIndexesURL: major_indexes_url,
  sectorPerformURL: `${sector_performance_url}&apikey=${apikey}`
};

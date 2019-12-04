const config = require("config"),
stock_intraday_url = config.stock_price.intraday.url,
stock_daily_url = config.stock_price.daily.url,
apikey = config.api_key

module.exports = {
  stockIntradayURL: (companySymbol,interval, outputsize) => {
    return `${stock_intraday_url}&symbol=${companySymbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apikey}`;
  },
  stockDailyURL: (companySymbol, outputsize) => {
    return `${stock_daily_url}&symbol=${companySymbol}&outputsize=${outputsize}&apikey=${apikey}`;
  }
};

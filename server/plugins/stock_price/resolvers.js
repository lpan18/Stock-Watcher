const dig = require("object-dig"),
  R = require('ramda'),
  config = require("config"),
  stockPriceHelper = require("./helper");

const intradayPriceResolver = (parent, args, context, info) => {
  const interval = config.stock_price.intraday.interval,
    outputsize = config.stock_price.intraday.outputsize,
    url = stockPriceHelper.stockIntradayURL(parent.symbol, interval, outputsize);
  return context
    .fetch(url)
    .then(response => {
      const last_refreshed_time = dig(response || {}, 'Meta Data')['3. Last Refreshed'];
      const time_zone = dig(response || {}, 'Meta Data')['6. Time Zone'];
      let prices_list = dig(response || {})[`Time Series (${interval})`];
      const keys = Object.keys(prices_list);
      // Append datetime to prices_list obj
      for (var i = 0; i < keys.length; i++) {
        prices_list[keys[i]] = { ...prices_list[keys[i]], ...{ '6. datetime': keys[i] } };
      }
      return formatResponse(last_refreshed_time, time_zone, Object.values(prices_list))
    })
    .catch(() => null);
};

const dailyPriceResolver = (parent, args, context, info) => {
  const outputsize = config.stock_price.daily.outputsize,
    url = stockPriceHelper.stockDailyURL(parent.symbol, outputsize);
  return context
    .fetch(url)
    .then(response => {
      const last_refreshed_time = dig(response || {}, 'Meta Data')['3. Last Refreshed'];
      const time_zone = dig(response || {}, 'Meta Data')['5. Time Zone'];
      let prices_list = dig(response || {}, 'Time Series (Daily)');
      // Append datetime to prices_list obj
      const keys = Object.keys(prices_list);
      for (var i = 0; i < keys.length; i++) {
        prices_list[keys[i]] = { ...prices_list[keys[i]], ...{ '6. datetime': keys[i] } };
      }
      return formatResponse(last_refreshed_time, time_zone, Object.values(prices_list))
    })
    .catch(() => null);
};

const intradayHPriceResolver = (parent, args, context, info) => {
  const interval = config.stock_price.intraday_h.interval,
    outputsize = config.stock_price.intraday_h.outputsize,
    url = stockPriceHelper.stockIntradayURL(parent.symbol, interval, outputsize);
  return context
    .fetch(url)
    .then(response => {
      const last_refreshed_time = dig(response || {}, 'Meta Data')['3. Last Refreshed'];
      const time_zone = dig(response || {}, 'Meta Data')['6. Time Zone'];
      let prices_list = dig(response || {})[`Time Series (${interval})`];
      const keys = Object.keys(prices_list);
      // Append datetime to prices_list obj
      for (var i = 0; i < keys.length; i++) {
        prices_list[keys[i]] = { ...prices_list[keys[i]], ...{ '6. datetime': keys[i] } };
      }
      return formatResponse(last_refreshed_time, time_zone, Object.values(prices_list))
    })
    .catch(() => null);
};

const formatResponse = (last_refreshed_time, time_zone, prices) => {
  return {
    last_refreshed: last_refreshed_time,
    time_zone: time_zone,
    prices: R.map((price) => {
      // console.log(price)
      return {
        open: dig(price, "1. open"),
        high: dig(price, "2. high"),
        low: dig(price, "3. low"),
        close: dig(price, "4. close"),
        volume: dig(price, "5. volume"),
        datetime: dig(price, "6. datetime")
      }
    }, prices)
  }
};

module.exports = {
  Security: {
    stock_price: (parent, args, context) => {
      if (R.isNil(dig(parent, 'symbol'))) {
        return null;
      }
      return parent;
    }
  },
  StockPrice: {
    intraday: (parent, args, context) => { return intradayPriceResolver(parent, args, context) },
    intraday_h: (parent, args, context) => { return intradayHPriceResolver(parent, args, context) },
    daily: (parent, args, context) => { return dailyPriceResolver(parent, args, context) }
  }
};

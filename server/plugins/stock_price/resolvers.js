const dig = require("object-dig"),
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
      const prices_list = dig(response || {})[`Time Series (${interval})`];
      // TODO: keep which objects
      const price = prices_list[Object.keys(prices_list)[0]];
      return formatResponse(last_refreshed_time, time_zone, price)
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
      const prices_list = dig(response || {}, 'Time Series (Daily)');
      // TODO: keep which objects
      const price = prices_list[Object.keys(prices_list)[0]];
      return formatResponse(last_refreshed_time, time_zone, price)
    })
    .catch(() => null);
};

const majorIndexesResolver = (parent, args, context, info) => {
  const url = stockPriceHelper.majorIndexesURL;
  return context
    .fetch(url)
    .then(response => {
      const major_indexes = dig(response || {}, "majorIndexesList");
      return major_indexes
    })
    .catch(() => null);
};

const sectorPerformResolver = (parent, args, context, info) => {
  const url = stockPriceHelper.sectorPerformURL;
  return context
    .fetch(url)
    .then(response => {
      const last_refreshed_time = dig(response || {}, 'Meta Data')['Last Refreshed'];
      // TODO more daily performance etc.
      const performance = dig(response || {}, 'Rank A: Real-Time Performance');
      return {
        last_refreshed: last_refreshed_time,
        performance: {
          financials: performance['Financials'],
          consumer_discretionary: performance['Consumer Discretionary'],
          industrials: performance['Industrials'],
          health_care: performance['Health Care'],
          materials: performance['Materials'],
          communication_services: performance['Communication Service'],
          utilities: performance['Utilities'],
          information_technology: performance['Information Technology'],
          consumer_staples: performance['Consumer Staples'],
          energy: performance['Energy'],
          real_estate: performance['Real Estat']
        }
      }
    })
    .catch(() => null);
}

const formatResponse = (last_refreshed_time, time_zone, price) => {
  return {
    last_refreshed: last_refreshed_time,
    time_zone: time_zone,
    prices: {
      open: dig(price, "1. open"),
      high: dig(price, "2. high"),
      low: dig(price, "3. low"),
      close: dig(price, "4. close"),
      volume: dig(price, "5. volume")
    }
  }
};

const stockPriceResolver = (parent, args, context, info) => {
  return {
    intraday: intradayPriceResolver(parent, args, context, info),
    daily: dailyPriceResolver(parent, args, context, info),
    major_indexes: majorIndexesResolver(parent, args, context, info),
    sector_performance: sectorPerformResolver(parent, args, context, info)
  }
};

module.exports = {
  Security: {
    stock_price: stockPriceResolver
  }
};

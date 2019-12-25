const dig = require("object-dig"),
  stockPriceHelper = require("./helper");

const sectorPerformResolver = (parent, args, context, info) => {
  const url = stockPriceHelper.sectorPerformURL;
  return context
    .fetch(url)
    .then(response => {
      const last_refreshed_time = dig(response || {}, "Meta Data")[
        "Last Refreshed"
      ];
      // TODO more daily performance etc.
      const performance = dig(response || {}, "Rank A: Real-Time Performance");
      return {
        last_refreshed: last_refreshed_time,
        performance: {
          financials: performance["Financials"],
          consumer_discretionary: performance["Consumer Discretionary"],
          industrials: performance["Industrials"],
          health_care: performance["Health Care"],
          materials: performance["Materials"],
          communication_services: performance["Communication Service"],
          utilities: performance["Utilities"],
          information_technology: performance["Information Technology"],
          consumer_staples: performance["Consumer Staples"],
          energy: performance["Energy"],
          real_estate: performance["Real Estat"]
        }
      };
    })
    .catch(() => null);
};

module.exports = {
  Security: {
    sector_performance: sectorPerformResolver
  }
};

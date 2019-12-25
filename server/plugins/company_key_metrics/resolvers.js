const dig = require("object-dig"),
  keyMetricsHelper = require("./helper"),

const keyMetricsResolver = (parent, args, context, info) => {
  const url = keyMetricsHelper.keyMetricsURL(parent.symbol);
  return context
    .fetch(url)
    .then(response => {
      const key_metrics = dig(response || {}, "metrics")[0];
      return {
        date: key_metrics["date"],
        revenue_per_share: key_metrics['Revenue per Share'],
        net_income_per_share: key_metrics['Net Income per Share'],
        free_cash_flow_per_share: key_metrics['Free Cash Flow per Share'],
        market_cap: key_metrics['Market Cap'],
        enterprise_value: key_metrics['Enterprise Value'],
        PE_ratio: key_metrics['PE ratio'],
        PB_ratio: key_metrics["PB ratio"]
      }
    })
    .catch(() => null);
}

module.exports = {
  Security: {
    key_metrics: keyMetricsResolver
  }
}
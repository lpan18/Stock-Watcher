const config = require("config"),
  key_metrics_url = config.company.key_metrics.url;

module.exports = {
  keyMetricsURL: companySymbol => {
    return `${key_metrics_url}/${companySymbol}`;
  }
};

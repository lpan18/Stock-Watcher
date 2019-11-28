const config = require("config"),
  income_url = config.company.financial.income.url;

module.exports = {
  incomeURL: (companySymbol, period) => {
    return `${income_url}/${companySymbol}?period=${period}`;
  }
};

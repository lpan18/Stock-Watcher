const dig = require("object-dig"),
  R = require("ramda"),
  config = require("config"),
  financialHelper = require("./helper");

const incomesResolver = (parent, args, context, info) => {
  const period = config.company.financial.income.period;
  const url = financialHelper.incomeURL(parent.symbol, period);
  return context
    .fetch(url)
    .then(response => {
      const financials = dig(response || {}, "financials");
      return R.map(item => {
        return {
          date: item.date,
          revenue: item.Revenue,
          EPS: item.EPS
        };
      }, financials);
    })
    .catch(() => null);
};

module.exports = {
  Security: {
    incomes: incomesResolver
  }
};

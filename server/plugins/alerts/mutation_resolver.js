const R = require("ramda");

const addAlertResolver = async (root, { id, symbol, low_price }, context) => {
  try {
    if (R.isNil(id) || R.isNil(symbol) || R.isNil(low_price)) {
      throw new Error("user or symbol or price not exist!");
    }
    return await context.pool
      .query(
        `INSERT INTO stock.alerts(id, symbol, low_price) VALUES ('${id}', '${symbol}', '${low_price}') ON CONFLICT DO NOTHING; SELECT * FROM stock.alerts WHERE id = '${id}'`
      )
      .then(res => res[1].rows);
  } catch (error) {
    console.log("Add to alerts error!" + error.stack);
  }
};

const removeAlertResolver = async (root, { alert_id, id }, context) => {
  try {
    if (R.isNil(alert_id) || R.isNil(id)) {
      throw new Error("alert not exist!");
    }
    return await context.pool
      .query(
        `DELETE FROM stock.alerts WHERE alert_id = '${alert_id}'; SELECT * FROM stock.alerts WHERE id = '${id}'`
      )
      .then(res => res[1].rows);
  } catch (error) {
    console.log("Remove from alerts error!" + error.stack);
  }
};

module.exports = {
  add_alert: addAlertResolver,
  remove_alert: removeAlertResolver
};

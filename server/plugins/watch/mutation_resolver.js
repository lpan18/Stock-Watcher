const config = require("config"),
 dig = require("object-dig"),
  R = require('ramda')

const addWatchResolver = async (root, { id, symbol }, context) => {
  console.log(id+':'+symbol)
  try {
    if (R.isNil(id) || R.isNil(symbol)) {
      throw new Error('user or symbol not exist');
    }
    const response = await context.pool.query(`INSERT INTO stock.watchlist(id, symbol) VALUES ('${id}', '${symbol}') ON CONFLICT DO NOTHING RETURNING *`).then(res => res.rows[0]);
    if(R.isNil(response) || R.isNil(response.symbol)){
      throw new Error('add to watchlist error');
    }
    return response;
  } catch (error) {
    console.log("in error" + error.stack)
  }
};

module.exports = {
  add_watch: addWatchResolver
};


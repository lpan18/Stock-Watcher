const R = require('ramda')

const addWatchResolver = async (root, { id, symbol }, context) => {
  try {
    if (R.isNil(id) || R.isNil(symbol)) {
      throw new Error('user or symbol not exist');
    }
    return await context.pool.query(`INSERT INTO stock.watchlist(id, symbol) VALUES ('${id}', '${symbol}') ON CONFLICT DO NOTHING; SELECT * FROM stock.watchlist WHERE id = '${id}'`).then(res => res[1].rows);
  } catch (error) {
    console.log("Add to watchlist error" + error.stack)
  }
};

const removeWatchResolver = async (root, { id, symbol }, context) => {
  try {
    if (R.isNil(id) || R.isNil(symbol)) {
      throw new Error('user or symbol not exist');
    }
    return await context.pool.query(`DELETE FROM stock.watchlist WHERE id = '${id}' and symbol = '${symbol}'; SELECT * FROM stock.watchlist WHERE id = '${id}'`).then(res => res[1].rows);
  } catch (error) {
    console.log("Remove from watchlist error" + error.stack)
  }
};


module.exports = {
  add_watch: addWatchResolver,
  remove_watch: removeWatchResolver
};


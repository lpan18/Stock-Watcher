const config = require("config")

const getWatchResolver = async (root, { id }, context) => {
  try {
    const watches = await context.pool.query(`SELECT * FROM stock.watchlist WHERE id = '${id}'`).then(res => res.rows);
    return watches;
  } catch (error) {
    console.log("in error" + error.stack)
  }
}

module.exports = {
    get_watch: getWatchResolver
};
const watchListResolver = async (root, { id }, context) => {
  try {
    return await context.pool
      .query(`SELECT * FROM stock.watchlist WHERE id = '${id}'`)
      .then(res => res.rows);
  } catch (error) {
    console.log("in error" + error.stack);
  }
};

module.exports = {
  watchlist: watchListResolver
};

const alertsResolver = async (root, { id }, context) => {
  try {
    const res = await context.pool.query(`SELECT * FROM stock.alerts WHERE id = '${id}'`).then(res => res.rows);
    return res;
  } catch (error) {
    console.log("in error" + error.stack)
  }
}

module.exports = {
  alerts: alertsResolver
};
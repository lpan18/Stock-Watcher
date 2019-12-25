const bcrypt = require("bcrypt")
  // jwt = require('jsonwebtoken');

const userResolver = async (root, { email, password }, context) => {
  try {
    const user = await context.pool.query(`SELECT * FROM stock.users WHERE email = '${email}'`).then(res => res.rows[0]);
    if (!user) {
      throw new Error('Incorrect user name or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Incorrect user name or password');
    }
    // user.jwt = jwt.sign({id:user.id}, config.jwt_secret);
    context.user = user;
    return user;
  } catch (error) {
    console.log("in error" + error.stack)
  }
}

module.exports = {
  user: userResolver
};
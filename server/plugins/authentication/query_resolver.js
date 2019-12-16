const config = require("config"),
  bcrypt = require("bcrypt"),
  jwt = require('jsonwebtoken');

const logInResolver = async (root, { email, password }, { pool }) => {
  console.log("in query resolver")
  console.log(email)
  try {
    const user = await pool.query(`SELECT * FROM stock.users WHERE email = '${email}'`).then(res => res.rows[0]);
    if (!user) {
      throw new Error('Incorrect user name or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Incorrect user name or password');
    }
    user.jwt = jwt.sign({id:user.user_id}, config.jwt_secret);
    console.log(user)
    return user;
  } catch (error) {
    console.log("in error" + error.stack)
  }
}

module.exports = {
  login: logInResolver
};
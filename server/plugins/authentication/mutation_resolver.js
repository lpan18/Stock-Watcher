const bcrypt = require("bcrypt");
// jwt = require('jsonwebtoken');

const signUpResolver = async (root, { email, name, password }, context) => {
  try {
    const existingUser = await context.pool
      .query(`SELECT * FROM stock.users WHERE email = '${email}'`)
      .then(res => res.rows[0]);
    if (existingUser) {
      throw new Error("User exists, please sign in directly");
    }
    const hash = await bcrypt.hash(password, 5);
    const user = await context.pool
      .query(
        `INSERT INTO stock.users(email, name, password) VALUES ('${email}', '${name}', '${hash}') RETURNING *`
      )
      .then(res => res.rows[0]);
    // user.jwt = jwt.sign({id:user.id, name:user.name}, config.jwt_secret);
    return user;
  } catch (error) {
    console.log("in error" + error.stack);
  }
};

module.exports = {
  signup: signUpResolver
};

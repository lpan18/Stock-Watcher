require('dotenv').config()
const { Pool } = require('pg')
 
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})
 
module.exports = pool

// db.one(`INSERT INTO stock.users(user_id, email, password) VALUES (123, 'testemail', 'testpassword') RETURNING email`)
//     .then(res => {
//         console.log(res);
//     });

// ;(async () => {
//     const client = await pool.connect()
//     try {
//       await client.query('BEGIN')
//       const queryText = 'INSERT INTO stock.watchlist(user_id,user_name,symbol) VALUES($1,$2,$3)'
//       await client.query(queryText, ['123','lei','AA'])
//       await client.query('COMMIT')
//     } catch (e) {
//       await client.query('ROLLBACK')
//       throw e
//     } finally {
//       client.release()
//     }
//   })().catch(e => console.error(e.stack))
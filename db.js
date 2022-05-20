const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PG_USER || 'user_public',
    password:process.env.PG_PSW ||'mood',
    database:process.env.PG_DB ||'moodapp',
    host:process.env.PG_HOST || 'localhost',
    port:5432
})

module.exports = pool;
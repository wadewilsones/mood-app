const Pool = require("pg").Pool;

const pool = new Pool({
    user:'user_public',
    password:'mood',
    database:'moodapp',
    host:'localhost',
    port:5432
})

module.exports = pool;
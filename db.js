const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'your data'
    password:'your data'
    database:'your data'
    host:'your data'
    port:5432,
})




module.exports = pool;

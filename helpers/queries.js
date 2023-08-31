const pool = require("../db");

const getUserId = async (username) => {
    try{
        const result = await pool.query("SELECT userid FROM users WHERE username = ?;", [username]);
        const userId = result[0][0].userid;
        return userId
    }
    catch(err){
        console.log(err)
    }    
}

module.exports = getUserId;
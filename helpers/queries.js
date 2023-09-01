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


const getUserEntry = async (id) => {

    try{
        const result = await pool.query("Select * from user_moods WHERE user_id = ?;", [id]);
        return result;
    }
    catch(err){
        console.log(err)
    }
}



module.exports = [getUserId, getUserEntry];
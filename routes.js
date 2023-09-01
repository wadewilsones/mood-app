const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require("./db");
const saltRounds = 10; // how much time is needed to calculate a single has
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const secretKey = crypto.randomBytes(32).toString('hex');

const [getUserId, getUserEntry] = require('./helpers/queries');



router.get('/', (req, res) => {
    res
    .status(200)
    .send({message: "Root"});
})

// Login and Sign up

router.post('/api/signup', async (req, res) => {
    try{

        const { username, password } = req.body;
        //hash password
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const addData =  await pool.query("INSERT INTO users (username, password) VALUES (?,?);", [username, hashPassword]);
        if (addData[0].affectedRows === 1){
            res
            .status(201)
            .send({message:`Thank you for registration, ${username}`});
        }
        else{
            res.send({message:'Error!'});
        }
    }
      
    catch(err){
        console.error(err.message)
    }
})
router.post('/api/authnetication',  async (req,res) => {

const { username, password } = req.body;

try{
    const user = await pool.query("SELECT * FROM users WHERE username = ?;", [username]);

    if(user[0].length === 0){
        console.log("Unknown username");
        res
        .status(401)
        .send({message:"Invalid username", error:true});
    }
    else if(user[0].length > 0){

        bcrypt.compare(password, user[0][0].password).then(function(success){
            if(success){

            req.session.user =  user[0][0];
            console.log("Credentials Correct");
            console.log("first key" + secretKey);
            const token = jwt.sign({ username: username }, secretKey, { expiresIn: '5h' });
            res.json({ token });
            }
            else{
                console.log("Wrong password");
                res.send({message:"Wrong password", error:true});
            }
        })

    }
    else{
        console.log("Else statement");
        res.send({status: "500", message:"ELSE STATEMENT"});
    }

}
catch(err){
    console.error(err.message);
}
})

/*JWT verification*/

const authneticationCheck = (req, res, next) => {
   
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if(token === null){
        return res.sendStatus(401);
    }
    else{
        jwt.verify(token, secretKey, (err, user) => {

            if(err){
                return res.send(err);
            }
            else{
                console.log(user);
                req.user = user;
                next();
            }
        })
    }
}


//PROTECTED ROUTES
//Get user data to display on dashboard
router.get(`/api/dashboard`, authneticationCheck, async (req, res) => {

    const userId =  await getUserId(req.user.username);
    const userEntry = await getUserEntry(userId);
    console.log(userEntry);
    if(userEntry[0].length > 0){
        res.send({weeklyData:userEntry[0][0], username:req.user.username});
    }
    else{
        res.send({message:'No data for this user'});
    }
    
    //res.send({username: req.user.username});
})


//Send data to mood table
router.post('/api/addMood', authneticationCheck, async (req,res) =>{
    console.log("Attempt to add Mood")

try{
    const { mood, entry } = req.body;
    const username = req.user.username;
    const userId = await getUserId(username); 
    //Check DB for existing information
    const checkData =  await pool.query("SELECT * FROM user_moods WHERE user_id = ?;", [userId]);
    if(checkData[0].length > 0){
        console.log(checkData.rows);
        //Update mood
        const updateMood = await pool.query("UPDATE user_moods SET mood_desc = ?, mood_desc = ? WHERE mood_date = CURDATE() AND user_id = ?;", [mood, entry, userId]);
        if(updateMood){
            console.log('Mood was updated')
        }
    }
    else if (checkData[0].length <= 0){
        const addMood = await pool.query("INSERT INTO user_moods (user_id, mood_date, mood_id, mood_desc) VALUES (?,CURDATE(),?,?);", [userId, mood, entry]);
        if(addMood){
            console.log('New record was added');
            res.send(
                {message:'Mood was added to'+ userId});
        }
        else{
            res.send(
                {message:'Mood was not added'}
            )
        }
    }

}

catch(err){
    console.error(err.message)
}
})



router.get('/api/weekData',  authneticationCheck, async (req,res) =>{

try{
    console.log("TEST")
    const userId =  await getUserId(req.user.username);
    const getMood = await pool.query(
        "SELECT * FROM user_moods WHERE user_id = ? AND mood_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) AND CURRENT_DATE() ORDER BY mood_id;",
        [userId]
      );
    if(getMood[0].length > 0){
        console.log('SEND ' + getMood[0])
        res.send(getMood[0])
    }
    else{
        res.send({message:'No entry found'})
    }  
}
catch(err){
    console.error(err.message)
}
})


//User data retrieval

// Post user data

module.exports = router;
const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const crypto = require('crypto');

const pool = require("./db");
const saltRounds = 10; // how much time is needed to calculate a single has
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const secretKey = crypto.randomBytes(32).toString('hex');


router.get('/', (req, res) => {
    res
    .status(200)
    .send({message: "Root"});
})

// Login and Sign up

router.post('/api/signup', async (req, res) => {
    try{

        const { username, password } = req.body;
        
        //Test for unique username


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
router.get(`/api/dashboard`, authneticationCheck, (req, res) => {


    res.send({ message: `Hello, ${req.user.username}! This is a protected route.` });


})


//Send data to mood table
router.post('/api/addMood', async (req,res) =>{
try{
    const { userId, mood, symptoms } = req.body;
    //Check DB for existing information
    const checkData =  await pool.query("SELECT * FROM user_moods WHERE mood_date = CURRENT_DATE AND user_idfk = $1 ORDER BY mood_id;", [userId]);
    if(checkData.rows.length > 0){
        console.log(checkData.rows);
        //Update mood
        const updateMood = await pool.query("UPDATE user_moods SET mood_descr = $1, symptoms = $2 WHERE mood_date = CURRENT_DATE AND user_idfk = $3;", [mood, symptoms, userId]);
        if(updateMood){
            console.log('Mood was updated')
        }
    }
    else if (checkData.rows.length <= 0){
        const addMood = await pool.query("INSERT INTO user_moods (user_idfk, mood_date, mood_descr, symptoms) VALUES ($1,CURRENT_DATE,$2,$3);", [userId, mood, symptoms]);
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



router.get('/api/usersFeeling',  async (req,res) =>{

try{
    const userId =  req.session.user.rows[0].userid;
    const getMood = await pool.query ("SELECT * FROM user_moods WHERE user_idfk = $1 AND mood_date BETWEEN CURRENT_DATE - 3 AND CURRENT_DATE ORDER BY mood_id;", [userId])
    if(getMood.rows.length > 0){
        console.log(getMood.rows)
        res.send(getMood.rows)
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
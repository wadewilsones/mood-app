require('dotenv').config();

// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 3000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const pool = require("./db");
const axios = require('axios');
//const session = require('cookie-session'); // for production

const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10; // how much time is needed to calculate a single has

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session"); //for deployment



//set up middleware
app.use(express.json());

app.use(cors({  
    origin: 'http://localhost:3001',
    methods:['GET','POST'],
    credential:false})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key:"userId",
    secret:"supersecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        expires:60 * 60 * 24
    }
}))

//app.use(express.static(path.join(__dirname, 'client/public')));

//For deployment
/*

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
app.get('/addMood', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
app.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

*/



app.get('/', async (req,res) => {

    res.send('Test')
}
)

app.post('/signUpUser', async (req,res) => {

    try{

        const { username, password } = req.body;
        //hash password
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const addData =  await pool.query("INSERT INTO users (username, password) VALUES (?,?);", [username, hashPassword]);
        if (addData.affectedRows === 1){
            res.send({message:'Added'});
        }
        else{
            res.send({message:'Error!'});
        }
    }
      
    catch(err){
        console.error(err.message)
    }
})


//Set up logout

app.get('/logoutUser',  (req, res) =>{
        req.session.destroy();
        res.send({
            loggedIn:false, 
            message:'You are logged out'}
        )
    })


app.post('/loginUser',  async (req,res) => {

    const { username, password } = req.body;
    
    try{
        console.log("INSIDE TRY")
        const user = await pool.query("SELECT * FROM users WHERE username = ?;", [username]);
        console.log(user[0][0].password);
        if(user[0].length === 0){
            console.log("Unknown username");
            res.send({status: "500", message:"No user found", error:true});
        }
        else if(user[0].length > 0){
            console.log("Checking for password match...");
            bcrypt.compare(password, user[0][0].password).then(function(success){
                if(success){
                req.session.user =  user[0][0];
                console.log("Credentials Correct");
                res.send({status: "200", message:"Credentials Correct", error:false});
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


app.get('/api/login', (req,res) => {

    if(req.session.user){
        res.send(
            {loggedIn:true, 
            user: req.session.user.rows[0].username,
            userId: req.session.user.rows[0].userid
            }
        )
    }
    else{ 
        res.send({loggedIn:false}
        )
    
    }

})


//Send data to mood table
app.post('/api/addMood', async (req,res) =>{
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



app.get('/api/usersFeeling',  async (req,res) =>{

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

/*
app.post('/api/getWeather', (req, res) => {
    try{
        const { lat, lon } = req.body;
        //console.log('Lat:' + lat +' lon ' + lon)
        //const API_KEY = process.env.API_KEY;
        //API_link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        //console.log(API_link);
       // axios.get(API_link)
        .then((response) => {
            res.send(response.data)
        })
        .catch(error => console.log(error))

    }
    catch(err){
        console.error(err.message)
    }
})

*/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 5000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const pool = require("./db");
//const session = require('cookie-session'); // for production

const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10; // how much time is needed to calculate a single has

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session"); //for deployment
const { ok } = require("assert");


//set up middleware
app.use(express.json());
app.use(cors({  
    origin: 'http://localhost:3000/',
    methods:['GET','POST'],
    credential:true})
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

app.use(express.static(path.join(__dirname, 'client/public')));

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

app.post('/signUpUser', async (req,res) => {

    try{

        const { username, password } = req.body;
        req.body.password = atob(req.body.password);
        //hash password
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const addData =  await pool.query("INSERT INTO users (username, password) VALUES ($1,$2);", [username, hashPassword]);
        if (addData){
            res.send({message:'Registration is successful'});
        }
        else{
            res.send({message:'Error!'});
        }
    }
      
    catch(err){
        console.error(err.message)
    }
})

app.get ("/APIkey", (req,res) => {
    res.send ( 
        {WeatherAPI: '6c6a4a356c2d25e5b8bc8b4736458bc4'}
        )
    
})


//Set up logout

app.get('/logoutUser',  (req, res) =>{
        req.session.destroy();
        res.send({
            loggedIn:false, 
            message:'You are logged out'}
        )
    })


app.post('/loginUser',  (req,res) => {
    try{
        const { username, password } = req.body;
        //Get data from DB
        pool.query("SELECT * FROM users WHERE username = $1", [username], (err, result) => {
            if (err){
                res.send({err:err.message})
            }
            if(result.rows.length > 0){
                    bcrypt.compare(password, result.rows[0].password).then(function(success){
                        if(success){
                        req.session.user = result;
                        res.send(result.rows);
                        }
                        else{
                            res.send({message:"Wrong password"});
                        }
                    })
            }
            else{
                res.send({message:"No user found"})
            }
        });
    
    }
    catch(err){
        console.error(message.err)
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
app.post('/addTodaysMood', async (req,res) =>{
    try{
        const { userId, mood, symptoms } = req.body;
        //Check DB for existing information
        const checkData = await pool.query("SELECT * FROM user_moods WHERE mood_date = CURRENT_DATE AND user_idfk = $1 ORDER BY mood_id;", [userId]);
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



app.get('/usersFeeling', async (req,res) =>{
    try{
        const userId =  req.session.user.rows[0].userid;
        const getMood = await pool.query ("SELECT * FROM user_moods WHERE user_idfk = $1 AND mood_date BETWEEN CURRENT_DATE - 3 AND CURRENT_DATE ORDER BY mood_id;", [userId])

        if(getMood.rows.length > 0){
            console.log(getMood.rows)
            res.send(getMood.rows)
        }    
    }
    catch(err){
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

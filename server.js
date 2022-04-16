
// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 5000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const pool = require("./db")

const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10; // how much time is needed to calculate a single has

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");


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

app.post('/signUp', async (req,res) => {

    try{
        const { username, password } = req.body;
        req.body.password = atob(req.body.password);
        const addData = await pool.query("INSERT INTO users (username, password) VALUES ($1,$2);", [username,password]);
        if (addData){
            res.send(addData);
        }
        }
      
    catch(err){
        console.error(err.message)
    }
})

app.get("/login", (req,res) => {
    if(req.session.user){
        res.send({loggedIn:true, user: req.session.user})
    }
    else{ res.send({loggedIn:false})
    
    }
})


app.post("/login", async (req,res) =>{
    try{
        const {username, password} = req.body;

        const loginUser = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2;", [username, password]);
        if(loginUser.rows.length > 0){
            req.session.user = loginUser.rows[0];
            console.log( req.session.user);
            res.send(loginUser);
        }
        else{
            res.send({user:"user not found!"});
        }
    }
    catch(err){
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})




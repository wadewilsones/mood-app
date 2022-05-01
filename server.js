
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

app.get("/login", (req,res) => {
    if(req.session.user){
        res.send(
            {loggedIn:true, 
            user: req.session.user.rows[0].username,
            userId: req.session.user.rows[0].userid
            }
        )
    }
    else{ res.send({loggedIn:false})
    
    }
})


app.post('/login',  (req,res) => {
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


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})




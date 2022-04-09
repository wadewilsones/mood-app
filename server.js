// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 5000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const pool = require("./db")
const cors = require('cors');


//set up middleware
app.use(express.json());
app.use(cors({  origin: 'http://localhost:3000/'}));
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/signUp', async (req,res) => {

    try{
        const { username, password } = req.body;
        console.log(req.body.username);
        //add data to database
       const addUser = await pool.query(
            "INSERT INTO users (username, password) VALUES($1,$2) RETURNING *", [username, atob(password)]);
        res.json(addUser.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

app.post('/login', async (req,res) => {
    try{
        const { username, password } = req.body;
        //Get data from DB
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", 
        [username, password], 
        (err, result) => {
            if (err){
                res.send({err:err})
            }
            if(result.rows.length > 0){
                res.send(result)
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



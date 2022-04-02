// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 5000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


//set up middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'mood/public')));

app.post('/signUp', async (req,res) => {

    try{
        const { username, password } = req.body;
        console.log(req.body.username);
        res.json('Server got your data!' + req.body.username + " " + req.body.password)
    }
    catch(err){
        console.error(err.message)
    }
})

app.get('/signUp', async (req, res) =>{
    res.send("Hello user!")
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})



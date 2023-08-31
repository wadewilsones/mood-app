require('dotenv').config();

// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 3000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");
const cors = require('cors');
const routes = require('./routes');
const axios = require('axios');
const cookieParser = require("cookie-parser");
const session = require("express-session"); //for deployment
const bodyParser = require('body-parser');
//const session = require('cookie-session'); // for production





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

// Use the router
app.use('/', routes);

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

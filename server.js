// Set up a server with Express
const express = require("express");
const PORT = process.env.PORT || 5000; // global variable that represent the state of the system environment when it starts
const app = express();
const path = require("path");


//set up routes
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/signUp', (req,res) => {
    const { username, password } = req.body;
    console.log(req.body);
    res.json('Server got your data!')
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})



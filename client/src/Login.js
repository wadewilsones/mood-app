import './App.css';
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Login (){

const [loginStatus, setLoginStatus] = useState("");
    
  useEffect(()=>{
    fetch("/login", {
      method:"GET",
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })
    .then (response => response.json())
    .then(data => console.log(data))
},[])

    const [userData, setUserdata] = useState({
        username:'',
        password:''
    });

    const changeInput = (event) => {
        const { name, value } = event.target;
        setUserdata(
            (prevState) => (
                {...prevState, [name]: value}
            ))
    }

    const {username, password} = userData;


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
        if (username != null && password != null)
        {
            sendData();
        }
    }

    const sendData = () => {

        fetch('/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })

        .then(response => response.json())
        .then(data => console.log(data))

    }

    

    return(
        <div className="sign-up-container">
        <h1>Moodnex</h1>
        <h2>{loginStatus}</h2>
        <h5>Your personal mood app</h5>
        <p>Login</p>
       <form method="POST" action="/" onSubmit={handleSubmit}> 
            <label htmlFor="username">Username</label>
           <input type="text" id="username" name="username"  value = {username} onChange = {changeInput} placeholder='Type here..' required />
           <label htmlFor="password">Password</label>
           <input type="password" id="password" name="password" value = {password} onChange = {changeInput} placeholder='Type here..' required />
           <input type="submit" id="subBtn" value="Login"/>
           <p>Don't have an account? <Link to="/sign-up">Sign Up!</Link></p>

       </form>
    </div>
    )
}


export default Login;

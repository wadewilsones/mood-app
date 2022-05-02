import './App.css';
import Mood from './Mood';
import React, { useState, useEffect } from "react";
import { Link, Navigate, NavigationType, NavLink, useNavigate } from "react-router-dom";

function Login(){

    const [userData, setUserdata] = useState({
        username:'',
        password:''
    });

    const [loginError, setError] = useState('');

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
        .then(data => {
            console.log(data);
            if(data.message){
                if(data.message == "Wrong password"){
                    setError("Wrong password!");
                }
                else if (data.message == "No user found"){
                    setError("Wrong username!");
                }
                else{
                    alert( 'Wrong credentials. Try again');
                }

            }
            else{
                window.location.reload();
            }
            
        })

    }

    return(
        <div className="sign-up-container">
        <div className = 'loginScreenHeader'> 
            <h1>Moodnex</h1>
            <h5>Your personal mood app</h5>
            <h3>Login</h3>
        </div>
        <div className={ loginError? "loginError-active" : "loginError-none"}>{loginError}</div>
       <form method="POST" action="/" onSubmit={handleSubmit}> 
            <label htmlFor="username">Username</label>
           <input type="text" id="username" name="username"  value = {username} onChange = {changeInput} placeholder='Type here..' required />
           <label htmlFor="password">Password</label>
           <input type="password" id="password" name="password" value = {password} onChange = {changeInput} placeholder='Type here..' required />
           <input type="submit" id="subBtn" value="Login"/>
           <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>

       </form>
    </div>

    )
}


export default Login;

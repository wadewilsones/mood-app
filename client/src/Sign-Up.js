import './App.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";


function SignUp (){

    const [userData, setUserdata] = useState({
        username:'',
        password:''
    });



    const changeInput = (event) => {
        const { name, value } = event.target;
        setUserdata(
            (prevState) => ({...prevState, [name]: value}),
            userData.password = btoa(userData.password)
            )
            console.log(userData.password);
    }

    const {username, password} = userData;


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
        if (username != null && password != null)
        {
            sendData();
            showNotification();
        }
    }

    const sendData = () => {

        fetch('/signUp', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })

        .then(response => response.json())
        .then(data => console.log(data))

    }


    const [notification, setNotificetion] = useState(false);

    const showNotification = () =>{
        setNotificetion(true)
    }

    const hideNotification = () =>{
        setNotificetion(false)
    }


    return(
        <div className="sign-up-container">
            {notification && <div className={`notification ${notification} ? "notification--Shown" : "notification--Hidden"}`}><p>Thank you for registration, {username}!<br></br><a onClick={hideNotification}>Close</a></p></div>}
            <div className = 'loginScreenHeader'> 
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <h3>Sign Up</h3> 
            </div>
            <form method="POST" action="/" onSubmit={handleSubmit}> 
                    <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username"  value = {username} onChange = {changeInput} placeholder='Username..' required />
                <label htmlFor="passwordR">Password</label>
                <input type="password" id="passwordR" name="password" value = {password}  onChange = {changeInput} placeholder= 'Enter Your Password' required />
                <input type="submit" id="subBtn" value="Sign Up"/>
                <p>Already have an account? <Link to="/login">Log In!</Link></p>

            </form>
    </div>
    )
}


export default SignUp;

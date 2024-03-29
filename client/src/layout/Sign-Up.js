import '../style/LoginStyle.css' 
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
            (prevState) => (
                {...prevState, 
                    [name]: value
                }
            ))
    }

    const {username, password} = userData;

    const [notification, setNotificetion] = useState({
        isActive:false,
        description:""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
        if (username != null && password != null)
        {
            sendData();
        }
    }

    const sendData = () => {

        fetch('http://localhost:3000/api/signup', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })

        .then(response => response.json())
        .then(data => {
            setNotificetion((prevState) => ({
                ...prevState,
                isActive: true,
                description:data.message
            }));
            })
    
    }

    const hideNotification = () =>{
        setNotificetion((prevState) => ({
            ...prevState,
            isActive: false,
            description:""
        }));
        setUserdata({
            username:'',
            password:''
        });
        window.location.href = '/login';
    }


    return(
        <div className="sign-up-container">
        <div className = {notification.isActive? "notification" : "notificationHidden"}><p>Thank you for registration, {username}</p><a onClick={hideNotification}>Close</a></div>
            
            <div className = 'loginScreenHeader'> 
                <h1>Feelu</h1>
                <h5>Keep track of your mind</h5>
                <h3>Sign Up</h3> 
            </div>
            <form method="POST" action="/" onSubmit={handleSubmit}> 
                <input type="text" id="username" name="username"  value = {username} onChange = {changeInput} placeholder='Username..' required autoComplete='true' />
                <input type="password" id="passwordR" name="password" value = {password}  onChange = {changeInput} placeholder= 'Enter Your Password' required autoComplete='true'/>
                <input type="submit" id="subBtn" value="Sign Up"/>
                <p>Already have an account? <Link to="/login">Log In!</Link></p>

            </form>
    </div>
    )
}


export default SignUp;

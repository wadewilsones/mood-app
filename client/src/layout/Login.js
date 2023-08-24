import React, { useState } from "react";
import '../style/LoginStyle.css' 
import { Link } from "react-router-dom";

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
        console.log('This is login')
        fetch('/loginUser', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credential:true,
            body: JSON.stringify(userData)
        })

        .then(response => response.json())
        .then(data => {
            console.log(data); // remove later
            if(data.message){
                if(data.message === "Wrong password"){
                    setError("Wrong password!");
                }
                else if (data.message === "No user found"){
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
            <h1>Feelu</h1>
            <h5>Keep track of your mind</h5>
            <h3>Sign In</h3>
        </div>
       <form method="POST" action="/" onSubmit={handleSubmit}>
       <p className={ loginError? "loginError-active" : "loginError-none"}>{loginError}</p> 

           <input type="text" id="username" name="username"  autoComplete='on' value = {username} onChange = {changeInput} placeholder='Email Address' required />
           <input type="password" id="password" name="password" autoComplete='on' value = {password} onChange = {changeInput} placeholder='Password' required />
           <span><a>Forgot Password?</a></span>
           <input type="submit" id="subBtn" value="Login"/>
           <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
       </form>
    </div>

    )
}


export default Login;
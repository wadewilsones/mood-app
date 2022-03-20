import './App.css';
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component{

    render(){
        return(
            <div  className="sign-up-container">
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <p>Sign Up</p>
               <form> 
                    <label htmlFor="username">Username</label>
                   <input type="text" id="username" name="username" placeholder='Type here..'></input>
                   <label htmlFor="password">Password</label>
                   <input type="text" id="password" name="password" placeholder='Type here..'></input>
                   <Link to="/"><input type="submit" id="subBtn" value="Sign Up"/></Link>
                   <p><Link to="/login">Already have an account? Login!</Link></p>
               </form>
            </div>

        )
    }

}

export default SignUp;

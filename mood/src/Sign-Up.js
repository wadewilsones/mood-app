import './App.css';
import React, { createElement } from 'react';

class SignUp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id="sign-up-container">
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <p>Sign Up</p>
                <form>
                <label for="username">Username</label>
                 <input type="text" id="username" placeholder='Type here..' name="username"></input>
                <label for="password">Username</label>
                 <input type="text" id="password" placeholder='Type here..' name="password"></input>
                 <input type="submit" id="submit-btn">Sign-Up</input>
                 <p>Already have an account? Login!</p>
                </form>
            </div>
        )
    }

}

export default SignUp;
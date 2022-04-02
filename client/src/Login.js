import './App.css';
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
      }

    handleSubmit(e){
        e.preventDefault();
        console.log("You submitted the form " + this.state.username);
    }


    render(){
        return(
            <div className="sign-up-container">
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <p>Login</p>
               <form onSubmit = {this.handleSubmit}> 
                    <label htmlFor="username">Username</label>
                   <input type="text" id="username" name="username" placeholder='Type here..' required/>
                   <label htmlFor="password">Password</label>
                   <input type="text" id="password" name="password" value ={this.state.value} onChange = {this.handleChange} placeholder='Type here..' required/>
                   <input type="submit" id="subBtn" value="Login"/>
                   <p>Don't have an account? Sign Up!</p>
               </form>
            </div>

        )
    }

}

export default Login;

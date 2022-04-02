import './App.css';
import React, { Component } from "react";
import { Link } from "react-router-dom";



class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        };

        this.validateForm = this.validateForm.bind(this);
        this.processForm = this.processForm.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    validateForm(e){
       e.preventDefault();
       console.log('Form submitted');
       if(document.getElementById('password').value.length > 6){
           let encryptpsw = btoa(document.getElementById('password').value);
           this.processForm(encryptpsw);
       }
       else{
           alert('Minimum 8 characters');
       }
    }

    processForm(psw){

        this.setState(
            {username: document.getElementById('username').value,
            password:  psw

        }, () =>  {this.sendData()}
        )
    }

     sendData(){
         alert("Send data works!");
         const formData = {
            username:this.state.username,
            password:this.state.password,
        }

        fetch('/signUp', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        })


        .then(response => response.json())
        .then(data => console.log(data))
    }



    render(){
      
        return(
            <div className="sign-up-container">
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <p>Sign Up</p>
                <form method="POST" action = "/" onSubmit={this.validateForm}> 
                    <label htmlFor="username">Username</label>
                   <input type="text" id="username" name="username" placeholder='Type here..' required></input>
                   <label htmlFor="password">Password</label>
                   <input type="text" id="password" name="password" placeholder='Type here..' required></input>
                   <input type="submit" id="subBtn" value="Sign Up" name="Submit"/>
                   <p>Already have an account? Login!</p>
               </form>
            </div>

        )
    }

}

export default SignUp;



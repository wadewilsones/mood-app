import './App.css';
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Login (){

    const [userData, setUserdata] = useState({
        username:'',
        password:''
    });

    const changeInput = (event) => {
        const { name, value } = event.target;
        setUserdata(
            (prevState) => ({...prevState, [name]: value}), console.log(value))      
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
        <h5>Your personal mood app</h5>
        <p>Login</p>
       <form method="POST" action="/" onSubmit={handleSubmit}> 
            <label htmlFor="username">Username</label>
           <input type="text" id="username" name="username"  value = {username} onChange = {changeInput} placeholder='Type here..' required />
           <label htmlFor="password">Password</label>
           <input type="text" id="password" name="password" value = {password} onChange = {changeInput} placeholder='Type here..' required />
           <input type="submit" id="subBtn" value="Login"/>
           <p>Don't have an account? <Link to="/sign-up">Sign Up!</Link></p>

       </form>
    </div>
    )
}

/*
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        }

         this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(
            {
                [name]:value
            }
        )
        
    }

    handleSubmit(e){
        e.preventDefault();
        console.log();
        if (this.state.username != null && this.state.password != null)
        {
            this.sendData();
        }

    }

    sendData(){
        const formData = {
            username:this.state.username,
            password:this.state.password
        }

        fetch('/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })

        .then(response => response.json())
        .then(data => console.log(data))

    }


    render(){
        return(
            <div className="sign-up-container">
                <h1>Moodnex</h1>
                <h5>Your personal mood app</h5>
                <p>Login</p>
               <form method="POST" action="/" onSubmit = {this.handleSubmit}> 
                    <label htmlFor="username">Username</label>
                   <input type="text" id="username" name="username" value={this.state.username} onChange = {this.handleChange} placeholder='Type here..' required />
                   <label htmlFor="password">Password</label>
                   <input type="text" id="password" name="password" value={this.state.password} onChange = {this.handleChange} placeholder='Type here..' required />
                   <input type="submit" id="subBtn" value="Login"/>
                   <p>Don't have an account? <Link to="/sign-up">Sign Up!</Link></p>

               </form>
            </div>

        )
    }

}
*/

export default Login;

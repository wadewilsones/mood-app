import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useState, useEffect } from "react";


const [loginData, setLoginData] = useState({
    loginStatus: false,
    username:'',
    userId: 0
})
    
  useEffect(()=>{
    console.log('This is useEFfect');
    fetch("/IsUserLoggedIn", {
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
    })
    .then (response => response.json())
    .then(data => {
      console.log('This is response from server after useUffect: '+ data);
        if(data.loggedIn){
          console.log('State:' + loginData) // remove later
          setLoginData(
            {loginStatus: data.loggedIn,
              username: data.user,
              userId: data.userId
          }) 
        }
        else{
            console.log('Not logged In')
        }
    })
    },[loginData])


let root = document.getElementById('root');

ReactDOM.render( <App status = {loginData.loginStatus} user = {loginData.username} userId = {loginData.userId}/>, root);
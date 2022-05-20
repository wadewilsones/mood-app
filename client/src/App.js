import './App.css';
import React, { useState, useEffect } from "react";
import Mood from './Mood';
import {
  BrowserRouter, Routes, Route, Navigate  
} from "react-router-dom";
import SignUp from './Sign-Up';
import Login from './Login';
import AddMood from './AddMood'


function App (props) {

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
    })
},[])


  //Setting up Routes

  return(
    <div>
      <BrowserRouter>
        <Routes>
        <Route path = "/" element = {loginData.loginStatus ? <Mood username = {loginData.username} userId = {loginData.userId}/>  : <Navigate to = "/login" replace />  } />
        <Route path = "/addMood" element= {loginData.loginStatus ? <AddMood userId = {loginData.userId}/> : <Navigate to = "/login" replace />} />
          <Route path = "/login" element= {!(loginData.loginStatus) ? <Login/> : <Navigate to = "/" replace  />}  />
          <Route path = "/signup" element= {<SignUp />} />

        </Routes>
      </BrowserRouter>
    </div>


  )
     
}

export default App;



import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Mood from './Mood';
import {
  BrowserRouter, Routes, Route, Navigate  
} from "react-router-dom";
import SignUp from './Sign-Up';
import Login from './Login';

function App () {

const [loginData, setLoginData] = useState({
    loginStatus: false,
    username:'',
    userId: 0
})
    
  useEffect(()=>{
    fetch("/login", {
      method:"GET",
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })
    .then (response => response.json())
    .then(data => {
        if(data.loggedIn){
          
          setLoginData(
            {loginStatus: data.loggedIn,
              username: data.user,
              userId: data.userId
          }) 
        }
        else{
          console.log (data)
        }
    })
},[])


  //Setting up Routes

  return(
    <div>
      <BrowserRouter>
        <Routes>
        <Route path = "/" element = {loginData.loginStatus ? <Mood username = {loginData.username} userId = {loginData.userId}/>  : <Navigate to = "/login" replace />  } />
          <Route path = "/login" element= {!(loginData.loginStatus) ? <Login/> : <Navigate to = "/" replace  />}  />
          <Route path = "/signup" element= {<SignUp />} />
          <Route path = "/test" element= {<Mood username = 'Suzanna' />} />

        </Routes>
      </BrowserRouter>
    </div>


  )
     
}

export default App;



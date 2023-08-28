import './App.css';
import React, { useState, useEffect } from "react";
import Dashboard from './layout/Dashboard';
import {
  BrowserRouter, Routes, Route, Navigate  
} from "react-router-dom";
import SignUp from './layout/Sign-Up';
import Login from './layout/Login';
import AddMood from './AddMood'


function App (props) {

const [loginData, setLoginData] = useState({
    loginStatus: false,
    username:'',
    userId: 0
})
    


/*
  useEffect(()=>{
    console.log("Test")
    fetch('http://localhost:3000/api/login', {
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      },
      //credentials: 'include'
    })
    .then (response => response.json())
    .then (data => {
        if(data.loggedIn){
          setLoginData(
            {loginStatus: data.loggedIn,
              username: data.user,
              userId: data.userId
          }) 
        }
    })
},[])

<Route path = "/" element = {loginData.loginStatus ? <Mood username = {loginData.username} userId = {loginData.userId}/>  : <Navigate to = "/login" replace />  } />
        <Route path = "/addMood" element= {loginData.loginStatus ? <AddMood userId = {loginData.userId}/> : <Navigate to = "/login" replace />} />
          <Route path = "/login" element= {!(loginData.loginStatus) ? <Login/> : <Navigate to = "/" replace  />}  />
*/

  //Setting up Routes

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Dashboard />} />
         <Route path = "/login" element= {!(loginData.loginStatus) ? <Login/> : <Navigate to = "/" replace  />}  />
          <Route path = "/signup" element= {<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
     
}

export default App;



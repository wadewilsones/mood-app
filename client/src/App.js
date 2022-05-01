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

  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
    
  useEffect(()=>{
    fetch("/login", {
      method:"GET",
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })
    .then (response => response.json())
    .then(data => {
        if(data.loggedIn == true){
            setLoginStatus(data.loggedIn);
            setUsername(data.user);
        }
        }  
    )

},[loginStatus])



  //Setting up Routes

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Mood />}/>
          <Route path = "/login" element= {!(loginStatus) ? <Login/> : <Navigate to = "/" replace  />}  />
          <Route path = "/signup" element= {<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
     
}

export default App;



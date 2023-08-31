import './App.css';
import React, { useState, useEffect } from "react";
import Dashboard from './layout/Dashboard';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet   
} from "react-router-dom";
import SignUp from './layout/Sign-Up';
import Login from './layout/Login';
import AddMood from './AddMood'


const PrivateRoute = () => {
  let auth;
  if(localStorage.getItem('token')){
    auth = true;
  }
  else{
    auth = false;
  }

  console.log(auth);
  return(
    auth? <Outlet /> : <Navigate to ='/login' />
  )

}


function App (props) {

  return(
    <div>
      <BrowserRouter>
        <Routes>

            <Route element={<PrivateRoute />}>
              <Route element = {<Dashboard />} path = "/" exact></Route>
              <Route element = {<Dashboard />} path = "/dashboard"></Route>
            </Route>

            <Route path = "/login" element= {<Login/>}  />
            <Route path = "/signup" element= {<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
     
}

export default App;



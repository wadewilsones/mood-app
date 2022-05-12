
import React from "react";
import Today from './date';

let todayInfo = Today();
let today = todayInfo[0].toString().split(' ');


function Header(props){

let { location }  = props.location;      

function Logout(){
        fetch('/logout', {
                method: "GET",
                headers:{
                        'Content-Type':'application/json'
                },
        })
        .then(response => response.json())
        .then(data => {
                console.log(data);
                window.location = '/';
        })
       
}

        return (
        <header>
                <section id='header-container'>
                        <h4>{today[0] + ", " + today[1] + " " + today[3]}</h4>
                        <h3>Hello {props.username}</h3>
                        <a onClick = {Logout}>Log out</a>
                </section>
        </header>)
}

export default Header;
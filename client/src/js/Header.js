
import React from "react";
import Today from './date';

let todayInfo = Today();
const date = todayInfo[0];

function Header(props){

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
                        <h4>{date}</h4>
                        <h3>Hello {props.username}</h3>
                        <a onClick = {Logout}>Logout</a>
                </section>
        </header>)
}

export default Header;
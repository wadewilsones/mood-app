
import React from "react";
import Today from './date';
import { Link }  from "react-router-dom";

let todayInfo = Today();
let today = todayInfo[0].toString().split(' ');


function Header(props){

let location  = props.location;

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
                        {location == 'test'?
                        <div>
                                <h4>{today[0] + ", " + today[1] + " " + today[3]}</h4>
                                <h3>Hello {props.username}</h3>
                        </div>  
                        : <div id = 'goBackHeader'>
                        <Link to = '/test'><img src="/media/goBack.svg" alt="goBack"></img></Link>
                        <Link to = '/test'><span>Go back</span></Link>
                        </div>
                        }
                        <a onClick = {Logout} id={location == 'test'? 'headerLogoutMain' : 'headerLogoutSecondary'}>Log out</a>
                </section>
        </header>)
}

export default Header;
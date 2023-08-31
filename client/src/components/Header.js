
import React from "react";
import Today from '../js/date';
import '../style/HeaderStyle.css'
import { Link }  from "react-router-dom";
let todayInfo = Today();
let today = todayInfo[0].toString().split(' ');


function Header(props){

let location  = props.location;

  const Logout = () =>{
     
        localStorage.clear('token');
        window.location.reload();
       
  }

        return (
        <header>
                <section id='header-container'>
                        {location === '/'?
                        <div>
                                <h4>{today[0] + ", "+ today[1] + " " +today[2]}</h4>
                                <h3>Hello {props.username}!</h3>
                                <h5>We’re glad to see you</h5>
                        </div>  
                        : <div id = 'goBackHeader'>
                        <Link to = '/'><img src="/media/goBack.svg" alt="goBack"></img></Link>
                        <Link to = '/'><span>Go back</span></Link>
                        </div>
                        }
                        <a onClick = {Logout} id={location === 'test'? 'headerLogoutMain' : 'headerLogoutSecondary'}>Log out</a>
                </section>
        </header>)
}

export default Header;
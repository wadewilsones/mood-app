import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from './js/Header';


let AddMood = (props) =>{

    return(
        
      <div id='addModd-container'>
        <Header location = 'testMood' />
        <section id='moodHolder'>
            <h3>Today I feel: </h3>
            <div className = 'mood-options'>
                <img src = 'media/happy.svg' alt ='happy' />
                <h4>Happy</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/joyful-2.svg' alt ='happy' />
                <h4>Joyful</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/Peaceful.svg' alt ='happy' />
                <h4>Peaceful</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/lovely.svg' alt ='happy' />
                <h4>Loving</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/stressed.svg' alt ='happy' />
                <h4>Stressed</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/upset.svg' alt ='happy' />
                <h4>Sad</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/angry.svg' alt ='happy' />
                <h4>Angry</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/frustrated.svg' alt ='happy' />
                <h4>Frustrated</h4>
            </div>
            <div className = 'mood-options'>
                <img src = 'media/grumpy.svg' alt ='happy' />
                <h4>Grumpy</h4>
            </div>

        </section>
        <section id = "symptoms">
            <h3>Is there anything else you want to mention?</h3>
            <textarea placeholder='Type here..'></textarea>
        </section>
        <button>Confirm</button>
      </div>
      

    )
}

export default AddMood;
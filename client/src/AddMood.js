import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from './js/Header';


let AddMood = (props) =>{

let [ mood, setMood ] = useState(''); 

function handleMood(e){
    setMood(mood = e.currentTarget.id);
}

let MoodContainer = {
    0: 'Happy',
    1: 'Joyful',
    2: 'Peaceful',
    3: 'Loving',
    4: 'Stressed',
    5: 'Sad',
    6: 'Angry',
    7: 'Frustrated',
    8: 'Grumpy'
}
console.log(mood);

    return(
        
      <div id='addModd-container'>
        <Header location = 'testMood' />
        <section id='moodHolder'>
            <h3>Today I feel: </h3>
            <div onClick = {handleMood} id = {MoodContainer[0]} >
                <img src = 'media/happy.svg' alt ='happy' className = {mood == MoodContainer[0]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[0]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[1]} >
                <img src = 'media/joyful-2.svg' alt ='Joyful'  className = {mood == MoodContainer[1]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[1]}</h4>
            </div>
            <div  onClick = {handleMood} id = {MoodContainer[2]} >
                <img src = 'media/Peaceful.svg' alt ='Peaceful'  className = {mood == MoodContainer[2]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[2]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[3]}>
                <img src = 'media/lovely.svg' alt ='Loving'  className = {mood == MoodContainer[3]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[3]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[4]}>
                <img src = 'media/stressed.svg' alt ='stressed' className = {mood == MoodContainer[4]? 'mood-selected' :'mood-img'} />
                <h4>{MoodContainer[4]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[5]}>
                <img src = 'media/upset.svg' alt ='upset' className = {mood == MoodContainer[5]? 'mood-selected' :'mood-img'} />
                <h4>{MoodContainer[5]}</h4>
            </div>
            <div  onClick = {handleMood} id = {MoodContainer[6]}>
                <img src = 'media/angry.svg' alt ='angry'  className = {mood == MoodContainer[6]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[6]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[7]}>
                <img src = 'media/frustrated.svg' alt ='frustrated'  className = {mood == MoodContainer[7]? 'mood-selected' :'mood-img'}/>
                <h4>{MoodContainer[7]}</h4>
            </div>
            <div onClick = {handleMood} id = {MoodContainer[8]}>
                <img src = 'media/grumpy.svg' alt ='grumpy'  className = {mood == MoodContainer[8]? 'mood-selected' :'mood-img'} />
                <h4>{MoodContainer[8]}</h4>
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
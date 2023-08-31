import React from "react";
import { useState } from "react";
import '../style/MoodSelection.css';

const MoodSelection = () => {

    const[currentMood, setMood] = useState(null);
    const[userEntry, setEntry] = useState('No entry');
    const[errors, setError] = useState(null);

    const[todayEntry, setTodayEntry] = useState({
        mood:null,
        entry: null
    })

    const handleUserEntry = (e) => {
        setEntry(e.target.value);
    }

    const sendData = (e) =>{

        e.preventDefault();
        setError(null);

        const userData = {
            mood:currentMood,
            entry:userEntry
        };

        if(currentMood === null && userEntry === 'No entry'){
            setError("You need to select your mood!");
        }
        else{
            fetch('http://localhost:3000/api/addMood', {
                method: "POST",
                headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        }
    }


    return(

        <div id = "MoodSelectionContainer">
            {todayEntry.mood == null ? 
            <div>
                <h3>What would best describe your state today?</h3>
                <span className="errors">{errors != null ? errors : null}</span>
                <form onSubmit={sendData}>
                    <div className="MoodOptions">

                    <div className="signleMoodContainer" onClick={() => setMood('frustrated')}>
                        <img src="./media/frustrated.png" alt='frustrated'></img>
                        <p>Frustrated</p>
                    </div>
                    <div className="signleMoodContainer" onClick={() => setMood('neutral')}>
                        <img src="./media/neutral.png"  alt='neutral'></img>
                        <p>Neutral</p>
                    </div>
                    <div className="signleMoodContainer" onClick={() => setMood('happy')}>
                        <img src="./media/happy.png"  alt='happy'></img>
                        <p>Happy</p>
                    </div>
                    <div className="signleMoodContainer" onClick={() => setMood('confused')}>
                        <img src="./media/confused.png" alt='Confused'></img>
                        <p>Confused</p>
                    </div>
                    <div className="signleMoodContainer" onClick={() => setMood('embarrassed')}>
                        <img src="./media/embarrassed.png"  alt='embarrassed'></img>
                        <p>Embarrassed</p>
                    </div>
                    <div className="signleMoodContainer" onClick={() => setMood('sad')}>
                        <img src="./media/sad.png"  alt='sad'></img>
                        <p>Sad</p>
                    </div>

                    </div>
                
                    <div className="userInputContainer">
                        <textarea placeholder="Notes..." onChange={handleUserEntry}></textarea>
                        <input type="submit" value="Confirm"></input>
                    </div>
                </form>
            </div>
           : 
           <div className="displayCurrentMood">
                <h3>Today you feel</h3>
                <img src = {`./media/${todayEntry.mood}.png`}  alt={todayEntry.mood} />
                <span>{todayEntry.mood}</span>
                <p id="">{ todayEntry.entry? todayEntry.entry : "No notes" }</p>
                <button>Edit</button>
           </div>
           }
        </div>
    )
}

export default MoodSelection;
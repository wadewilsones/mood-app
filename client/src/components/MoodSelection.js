import React from "react";
import '../style/MoodSelection.css';

const MoodSelection = () => {
    return(
        <div id = "MoodSelectionContainer">
            <h3>What would best describe your state today?</h3>

            <form>
                <div className="MoodOptions">

                <div className="signleMoodContainer">
                    <img src="./media/frustrated.png" alt='frustrated'></img>
                    <p>Frustrated</p>
                </div>
                <div className="signleMoodContainer">
                    <img src="./media/neutral.png"  alt='neutral'></img>
                    <p>Neutral</p>
                </div>
                <div className="signleMoodContainer">
                    <img src="./media/happy.png"  alt='happy'></img>
                    <p>Happy</p>
                </div>
                <div className="signleMoodContainer">
                    <img src="./media/confused.png" alt='Confused'></img>
                    <p>Confused</p>
                </div>
                <div className="signleMoodContainer">
                    <img src="./media/embarrassed.png"  alt='embarrassed'></img>
                    <p>Embarrassed</p>
                </div>
                <div className="signleMoodContainer">
                    <img src="./media/sad.png"  alt='sad'></img>
                    <p>Sad</p>
                </div>

                </div>
              
                <div className="userInputContainer">
                    <textarea placeholder="Notes..."></textarea>
                    <input type="submit" value="Confirm"></input>
                </div>
            </form>
           

        </div>
    )
}

export default MoodSelection;
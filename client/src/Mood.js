//set up class
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import Header from './js/Header';
import Today from './js/date';
import Weather from './js/Weather';
import { SendData } from './Sign-Up';

let todayInfo = Today();
const date = todayInfo[0];
const formattedDate = todayInfo[2];
let dayDate = date.split(',')
let otherDays = todayInfo[3];
let monthChange = todayInfo[4];

for (const day in otherDays){
    otherDays[day] = otherDays[day].getDate() + " " + monthChange(otherDays[day].getMonth() + 1);
}
console.log(otherDays);


class Mood extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            mood:'',
            symptoms:'',
            date:dayDate[0],
            username: props.username,
            userId: props.userId
        };

        this.week = otherDays;
        this.changeMoodGood = this.changeMoodGood.bind(this);
        this.changeMoodNeutral = this.changeMoodNeutral.bind(this);
        this.changeMoodBad = this.changeMoodBad.bind(this);
        this.HandleSymptoms = this.HandleSymptoms.bind(this);
        this.sendMood = this.sendMood.bind(this);

    }
    
    componentDidMount(){
        fetch("/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
          })
          .then (response => response.json())
          .then(data => {
            this.setState({
                mood:data.mood_descr,
                symptoms:data.symptoms,
            })  
            console.log(this.state)
          })
    }

    HandleSymptoms(e){
        e.preventDefault();
        this.setState({symptoms:e.target[0].value}, () => {
            let moodData = {
                userId: this.state.userId, 
                moodDate:formattedDate.toISOString().slice(0,10),
                symptoms:this.state.symptoms
            }
            fetch('/addSymptoms', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(moodData)
            })
           .then(response => console.log(response));   

            })
        

    }

    changeMoodGood(){
        this.setState({mood:"good"}, () => {
            this.sendMood();
        })
    }


    changeMoodNeutral(){
        this.setState({mood:"neutral"}, () => {
            this.sendMood();
        })
    }

    changeMoodBad(){
        this.setState({mood:"bad"}, () => {
            this.sendMood();
        })
    }

    //Sent data to DB
  sendMood(){

        let moodData = {
            userId: this.state.userId, 
            moodDate:formattedDate.toISOString().slice(0,10),
            mood:this.state.mood
    }   


        fetch('/addMood', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(moodData)
        })
       .then(response => console.log(response));

    }


    render() {
        return(
            <div onClick = {this.displayMood}>
            <Header username = {this.state.username}/>
            <section id='mood-days'>
                <div className='days-div'>
                <p>{this.week.fourDaysAgo}</p>
                </div>
                <div className='days-div'>{this.week.threeDaysAgo}</div>
                <div className='days-div'>
                {this.week.twoDaysAgo}<br/>
                </div>
                <div className='days-div'>{this.week.yersterday}</div>
                <div className='days-div'>{this.state.date}<br/>
                <img src = {this.state.mood === 'good' ? "media/good.svg" 
                                : this.state.mood === 'bad' ? "media/sad.svg"
                                : "media/neutral.svg" } alt = 'mood'></img>
                </div>
            </section>
            <div className = {this.state.mood? "TodayMood" : "TodayMoodHidden"}>So, today you feel {this.state.mood}</div>
            <div id='content-container'>
                <section id ="mood-section">
                <h3>How do you feel today?</h3>
                <div id="mood-container">
                    <div id ="good" onClick = {this.changeMoodGood}>
                        <img src="media/good.svg"></img>
                        <button className = "userMood" >Good</button>
                    </div>
                    <div id ="neutral">
                    <img src="media/neutral.svg" onClick={this.changeMoodNeutral}></img>
                        <button  className = "userMood" >Neutral</button>
                    </div>
                    <div  id ="bad">
                    <img src="media/sad.svg" onClick={this.changeMoodBad} ></img>
                        <button className = "userMood" >Horrible</button>
                    </div>
                </div>
                </section>
            <section id="symtomps">
                <form onSubmit = {this.HandleSymptoms}>
                    <label>Got any symptoms?</label><br/>
                    <textarea placeholder='If there are any concerns you can add them here...'></textarea>
                    <input type="submit" value = "Add symptoms"></input>
                </form>
                <p>{this.state.symptoms}</p>
            </section>
            </div>
        </div>
        )
    }
}

export default Mood;
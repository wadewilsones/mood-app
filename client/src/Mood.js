//set up class
import React from 'react';
import Header from './js/Header';
import Today from './js/date';
//import Weather from './js/Weather';

let todayInfo = Today();
const date = todayInfo[0];
let dayDate = date.split(',')
let otherDays = todayInfo[3];
let monthChange = todayInfo[4];

for (const day in otherDays){
    otherDays[day] = otherDays[day].getDate() + " " + monthChange(otherDays[day].getMonth() + 1);
}

class Mood extends React.Component{
  
    constructor(props){
        super(props);
        //Setting up state
        this.state = {
            mood:'',
            symptoms:'',
            date:dayDate[0],
            username: props.username,
            userId: props.userId
        };
        
        this.weekMood = {
            0: {
                date:otherDays.yersterday,
                mood:'none'
            },
            1: {
                date:otherDays.twoDaysAgo,
                mood:''
            },
            2: {
                date:otherDays.threeDaysAgo,
                mood:''
            },
            3: {
                date:otherDays.fourDaysAgo,
                mood:''
            },
        };

        //Binding functions
        this.changeMoodGood = this.changeMoodGood.bind(this);
        this.changeMoodNeutral = this.changeMoodNeutral.bind(this);
        this.changeMoodBad = this.changeMoodBad.bind(this);
        this.HandleSymptoms = this.HandleSymptoms.bind(this);
        this.sendMood = this.sendMood.bind(this);

    }
    
    /*

    componentDidMount(){
        fetch("/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
          })
          .then (response => response.json())
          .then(data => {

            this.setState({
                mood:data[data.length - 1].mood_descr,
                symptoms:data[data.length - 1].symptoms,
            });
            //New weekMood here   
            console.log(this.weekMood);
            console.log('This is updated mood for yersterday '+ this.weekMood[0].mood);
           
          })
    }

    */

    HandleSymptoms(e){
        e.preventDefault();
        this.setState({symptoms:e.target[0].value}, () => {
            let moodData = {
                userId: this.state.userId, 
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
            mood:this.state.mood
    }   
    console.log( 'What we are sending',moodData)

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
                    {this.weekMood[2].date}<br/>
                    <img alt ='mood' src = {this.weekMood[2].mood === 'good' ? "media/good.svg" 
                    : this.weekMood[2].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg"  }></img>
                </div>

                <div className='days-div'>
                {this.weekMood[1].date}<br/>
                    <img alt ='mood' src = {this.weekMood[1].mood === 'good' ? "media/good.svg" 
                    : this.weekMood[1].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg" } ></img>

                </div>
                <div className='days-div'>
                    {this.weekMood[0].date}<br/>
                    {this.weekMood[0].mood}
                    <img alt ='mood' src = {this.weekMood[0].mood === 'good' ? "media/good.svg" 
                    :this.weekMood[0].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg" }></img>
                </div>

                <div className='days-div'>Today<br/>
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
                        <img src="media/good.svg" alt ='Good Mood'></img>
                        <button className = "userMood" >Good</button>
                    </div>
                    <div id ="neutral">
                    <img src="media/neutral.svg" onClick={this.changeMoodNeutral} alt ='neural Mood'></img>
                        <button  className = "userMood" >Neutral</button>
                    </div>
                    <div  id ="bad">
                    <img src="media/sad.svg" onClick={this.changeMoodBad} alt ='sad Mood'></img>
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
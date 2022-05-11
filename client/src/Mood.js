//set up class
import React from 'react';
import Header from './js/Header';
import WeekMood from './js/WeekMood';
import AddMood from './js/AddMood';
import Weather from './js/Weather';

//import Weather from './js/Weather';


class Mood extends React.Component{
  
    constructor(props){
        super(props);
        //Setting up state
        this.state = {
            mood:'',
            symptoms:'',
            date:new Date(),
            username: props.username,
            userId: props.userId
        };
        


        //Binding functions
        this.changeMoodGood = this.changeMoodGood.bind(this);
        this.changeMoodNeutral = this.changeMoodNeutral.bind(this);
        this.changeMoodBad = this.changeMoodBad.bind(this);
        this.HandleSymptoms = this.HandleSymptoms.bind(this);
        this.sendMood = this.sendMood.bind(this);
    }
    

    
    componentDidMount(){// send to weekMoods
        fetch("/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then (response => response.json())
        .then(data => {
                //Compare today's date and DB dates
            let databaseDate = data[data.length - 1].mood_date.split('T');
            let sessionDate = this.state.date.toLocaleDateString('en-CA').split('T');
            if(databaseDate[0] == sessionDate[0]){
                this.setState({
                    mood: data[data.length - 1].mood_descr,
                    symptoms:data[data.length - 1].symptoms
                })
            }
              
            })
    }
    

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
            <div id='moodContainer'>
                    <div onClick = {this.displayMood}>
                        <Header username = {this.state.username}/>

                        <section id = 'weatherSection'>
                            <h3>Today’s weather</h3>
                            <Weather />
                        </section>

                        <section id = "checkinSection">
                            <h3>These are your last check-ins</h3>
                            <WeekMood mood = {this.state.mood}/>
                        </section>

                        <section id='moodEdit'>
                        <h3> {this.state.mood?this.state.mood : "No entries for today"}</h3>
                        </section>

                        <section id='ChangeMoodSection'>
                            <div>
                                <a>+</a>
                                <h4>Add mood</h4>
                            </div>
                        </section>

                        </div> 
            </div> 
        )
    }
}

export default Mood;
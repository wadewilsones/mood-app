//set up class
import React from 'react';
import Header from '../components/Header';
import WeekMood from '../components/WeekMood';
import MoodSelection from '../components/MoodSelection';
import '../style/DashboardStyle.css' 
import Weather from '../components/Weather';
import { Link }  from "react-router-dom";

//import Weather from './js/Weather';


const Dashboard = (props) => {

    return(
        <div id='moodContainer'>
            <Header  location = '/' />
            <section id = "checkinSection">
                <WeekMood/>
            </section>
            <section id = 'weatherSection'>
                <Weather />
            </section>

            <section id = 'moodSection'>
                <MoodSelection />
            </section>

        </div> 
    )
}
    /*

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
        
    }
    


    componentDidMount(){// send to weekMoods
   
        fetch("/api/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then (response => response.json())
        .then(data => { 
            //Compare today's date and DB dates
                let databaseDate = data[data.length - 1].mood_date.split('T');
                let sessionDate = this.state.date.toLocaleDateString('en-CA').split('T');
                if(databaseDate[0] === sessionDate[0]){

                    this.setState({
                        mood: data[data.length - 1].mood_descr,
                        symptoms:data[data.length - 1].symptoms
                    })
                }
            })    
              
    }


    render() {
        return(
          
        )
    }
   
}
 */
export default Dashboard;
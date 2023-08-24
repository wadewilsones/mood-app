import '../App.css';
import React, { useState, useEffect } from "react";
import Today from './date';


let todayInfo = Today();
let formateMonth = todayInfo[3];

let  WeekMood = (props) =>{

    let mood = props.mood;

    let [ weekMood, setWeekMood ] = useState(
        {
            0: {
                date:todayInfo[2].threeDaysAgo,
                mood:''
            },
            1: {
                date:todayInfo[2].twoDaysAgo,
                mood:''
            },
            2: {
                date:todayInfo[2].yersterday,
                mood:''
            }
        }
    )
    //Display week's moods

    useEffect(() => {
        fetch("/api/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then (response => response.json())
        .then(data => {
            for(let i = 0; i < Object.keys(weekMood).length; i++){
                //Check each week day for concurrence
                for(let index = 0; index < data.length; index++){
                    let frontDate = weekMood[i].date.toLocaleDateString('en-CA').split('T');
                    let dateToCompare = data[index].mood_date.split('T');
                    if(dateToCompare[0] === frontDate[0]){
                        setWeekMood(
                            (prevState) => ({...prevState, 
                                [i]:{ 
                                    ...prevState[i],
                                    mood:data[index].mood_descr}
                               
                            } )
                            
                        )
                
                    }
                }
            }

        })
        

    },[])

   let formatDates = (rowDate) => {
        rowDate = formateMonth(rowDate.getMonth() + 1) +  ' ' + rowDate.getDate();
        return rowDate;
    }

    let noData = "No entry";

    return(
        <section id='mood-days'>

                <div className='days-div'>
                    {formatDates(weekMood[0].date)}<br/>
                    <p>{weekMood[0].mood? weekMood[0].mood : noData}</p>
                </div>

                <div className='days-div'>
                {formatDates(weekMood[1].date)}<br/>
                <p>{weekMood[1].mood? weekMood[1].mood : noData}</p>

                </div>
                <div className='days-div'>
                    {formatDates(weekMood[2].date)}<br/>
                    <p>{weekMood[2].mood? weekMood[2].mood : noData}</p>
                </div>

                <div className='days-div'>Today<br/>
                <p>{mood? mood: 'No entry'}</p>
                </div>
            </section>
    )
}

export default WeekMood;
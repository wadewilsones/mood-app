import React, { useEffect } from 'react'
import { useState } from 'react';
import '../style/WeatherStyle.css'


function Weather(){

    // Set location
    let [location, setLocation] = useState({
        latitude: '',
        longitude:''
    })

    let [time, setTime] = useState(new Date());

    // Set weather description to fill in after weather API call
    let [weather, setWeather] = useState({
        location: 'Not selected',
        temperature: '20',
        description: 'none'
    })


    //Time and geolocation
    useEffect(() => {
        setInterval(() => {setTime(new Date())}, 10000);
        //Get user position
        navigator.geolocation.getCurrentPosition(userPosition); // should run once        
    },[])


    //Set up weather
    useEffect(()=> {
      
        if(location.latitude !== ''){
            getWeather(location.latitude, location.longitude);
        }

    },[location])
    


    function userPosition(data){
        let position = data.coords;
        let lat = position.latitude;
        let lot = position.longitude;
            setLocation(prevState => ({
                    latitude:lat,
                    longitude:lot
            }))
    }

    function getWeather(lat,lon){

        let weatherData = {
            lat:lat,
            lon:lon
        }

        fetch('/api/getWeather', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(weatherData)
        })
        .then(response => {
            return response.json()
          })
        .then((data) => {
            let city = data.name;
            let temp = (data.main.temp - 273.15).toFixed(0);
            let descr = (data.weather[0].description)
            setWeather({
                location: city,
                temperature: temp,
                description: descr
            })
        });  

        }      


    return(   
        <section className='weatherMainContainer'>
                <h3>Weather also can impact your state</h3>
                <div className='weatherInfoContainer'>
                    <div className="weather_container">
                        <p id="Location">{weather.location}</p> 
                        <p id="temperature">{weather.temperature}°</p>
                        <p id="time">{time.getHours() + ":" + time.getMinutes()}</p>
                    </div>

                    <div className = "weatherFacts">
                        <h5>Interesting Fact</h5>
                        <p> Weather can significantly influence human mood and emotions. On sunny days, increased exposure to natural light can boost serotonin levels, promoting feelings of happiness and well-being.</p>
                    </div>
                </div>
               
          
        </section>
    )
}

export default Weather;

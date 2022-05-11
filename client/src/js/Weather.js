import React, { useEffect } from 'react'
import { useState } from 'react';


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
        temperature: '20C',
        description: 'none'
    })

    useEffect(() => {
        setInterval(() => {setTime(new Date())}, 20000);
        //Run the position locator
        GeoObject();
        if(location.latitude != ''){
            getWeather(location.latitude, location.longitude);
        }
      
    },[location]) 
    


    //Get user location
    function GeoObject(){
        navigator.geolocation.watchPosition(userPosition);
        
    }

    function userPosition(data){
        let position = data.coords;
        let lat = position.latitude;
        let lot = position.longitude;
        setLocation(prevState => ({
                    latitude:lat,
                    longitude:lot
        }))
        return[lat, lot]
    }



    function getWeather(lat,lon){
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
         //Make a call
        fetch(API_link)
        .then(function(response){
        return response.json();
    })
    .then(data => {
        let city = data.name;
        let temp = (data.main.temp - 273.15).toFixed(0);
        let descr = (data.weather[0].description)
        setWeather(prevState => ({
            location: city,
            temperature: temp,
            description: descr
        }))
    })
    }

    
    GeoObject();
    return(   
        <div className="weather_container">
        <p id="Location">{weather.location}</p> 
        <p id="temperature">{weather.temperature}</p>
        <p id="weather-decrs">{time.getHours() + ":" + time.getMinutes()}</p>
        </div>
    )
}

export default Weather;

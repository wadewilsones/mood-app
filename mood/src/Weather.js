import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
//Call weather API

function Weather(){
    //Get user location
    function GeoObject(){
        navigator.geolocation.getCurrentPosition(userPosition);
    }

    function userPosition(location){
        let position = location.coords;
        console.log("latitude:" + position.latitude)
        let lat = position.latitude;
        let lot = position.longitude;
        //Display location
        let displayLocation = document.getElementById('Location');
        displayLocation.innerHTML = "latitude: " + position.latitude + "</br>" + "Longitude: " + position.longitude;

    }


    GeoObject();
    return(   
        <div className="weather_container">
        <p id="Location"></p>
        </div>
    )
}

export default Weather;
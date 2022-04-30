//Set up API call
function DetectLocation(lat,lon){

    const API_KEY = "";
    const API_link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    console.log(API_link);
    //Make a call
    fetch(API_link)
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(myJSON){
        console.log(myJSON.name + " " + (myJSON.main.temp - 273.15).toFixed(0));
        let city = myJSON.name;
        let temp = (myJSON.main.temp - 273.15).toFixed(0);
        let descr = (myJSON.weather[0].description)
        //Display fetched data in DOM
        let displayLocation = document.getElementById('Location');
        displayLocation.innerHTML = city;

        let displayTemp = document.getElementById('temperature');
        displayTemp.innerHTML = temp+"°";

        let displayDescription = document.getElementById('weather-decrs');
        displayDescription.innerHTML = descr;

    })

}

export default DetectLocation;

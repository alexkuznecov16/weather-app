import React from 'react';
import './WeatherApp.css';

// images import start
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
// images import end

// main function WeatherApp start
const WeatherApp = () => {
    let API_KEY = 'b923947b760d9eff66fca072b3324223'; // personal API key for weather

    // function which will search city or country
    const search_city = async () => {
        // async, because we work with requests
        let element = document.getElementById('cityInput'); // user wrote place

        // if user wrote nothing
        if (element.value === '') {
            return; // end
        } else {
            let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${API_KEY}`; // by this url we can find place data of weather
            let response = await fetch(API_URL); // by await we get data of city
            let API_DATA = await response.json(); // convert data to json format

            // if city not found
            if (API_DATA.cod === '404') {
                alert('City not found.'); // modal response
            } else {
                // Our responses by json we inner to html
                document.getElementById('weatherTemp').innerHTML = Math.trunc(API_DATA.main.temp - 273.15) + '°C'; // temperature (Calvin - 273.15 == celsius)
                document.getElementById('humidityPercent').innerHTML = `${API_DATA.main.humidity}%`; // humidity
                document.getElementById('windSpeed').innerHTML = `${API_DATA.wind.speed} km/h`; // wind speed
                document.getElementById('cityName').innerHTML = `${API_DATA.name} (${API_DATA.sys.country})`; // city name anc country
                let degIcon = checkDeg(API_DATA.main.temp - 273.15); // send to check degrees temp in celsius (Calvin - 273.15 == celsius)
                document.getElementById('weatherIcon').setAttribute('src', degIcon); // change weatherIcon attribute by checkDeg function
            }
        }
    };

    // function which check degrees and return weather icon start
    const checkDeg = (x) => {
        if (x < 0) {
            return snow_icon;
        } else if (x >= 0 && x < 10) {
            return rain_icon;
        } else if (x >= 11 && x < 17) {
            return drizzle_icon;
        } else if (x >= 18 && x < 23) {
            return cloud_icon;
        } else {
            return clear_icon;
        }
    };
    // function which check degrees and return weather icon end

    // jsx (html) code start
    return (
        <div className='weather__block'>
            <div className='top-bar'>
                <input id='cityInput' className='city-input' type='search' placeholder='Search' /> {/* User area for city writing */}
                <div onClick={() => { search_city(); }} className='search-icon'> {/* If user clicks - function will be on process */}
                    <img src={search_icon} alt='Search-Icon' />
                </div>
            </div>
            <div className='weather__image'>
                <img id='weatherIcon' src={clear_icon} alt='Clear' /> {/* Icon of weather */}
            </div>
            <div id='weatherTemp' className='weather__temp'>18</div> {/* Degrees count */}
            <div id='cityName' className='weather__location'>London (UK)</div> {/* User wrote place in input and here you can see city and country */}
            <div className='data__container'>
                {/* Humidity start */}
                <div className='element'>
                    <img src={humidity_icon} alt='humidity' /> {/* Humidity icon */}
                    <div className='data'>
                        <div id='humidityPercent' className='humidity-percent'>64%</div> {/* Humidity percents */}
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                {/* Humidity end */}
                {/* Wind speed start */}
                <div className='element'>
                    <img src={wind_icon} alt='humidity' /> {/* Wind icon */}
                    <div className='data'>
                        <div id='windSpeed' className='wind-speed'>14km/h</div> {/* Wind speed in km/h */}
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
                {/* Wind speed end */}
            </div>
        </div>
        
    );
    // jsx (html) code end
};
// main function WeatherApp end

export default WeatherApp;

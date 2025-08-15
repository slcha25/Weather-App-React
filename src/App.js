import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedWeather from 'react-animated-weather'; // Importing the animated weather component
import Header from './Components/Header'; // Importing the header component
import Footer from './Components/Footer'; // Importing the footer component

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Ensure you have your OpenWeatherMap API key set in your .env file
const DEFAULT_LOCATION = "New York"; // Default location to fetch weather data if geolocation fails or is denied

function App() {
  const [data, setData] = useState({});  // State to hold weather data
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [geoPermission, setGeoPermission] = useState('prompt'); // State to manage geolocation permission status
  const [searchType, setSearchType] = useState('city'); // 'city', 'zip', or 'landmark'

  // Unified fetch function that handles all search types
  const fetchWeather = (query, type) => {  // type can be 'city', 'zip'
    setLoading(true);   // Reset loading state
    setError(null);  // Reset error state

    // Construct the API URL based on the search type
    let url;
    if (type === 'zip') { // ZIP code search
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=${API_KEY}`;
    } else {
      // For city search
      url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;
    }

    axios.get(url)  // Fetch weather data from OpenWeatherMap API
      .then((response) => {   // Check if the response is valid
        setData(response.data);  // Update the data state with the response
        setLoading(false);  // Reset loading state
      })
      .catch((err) => {    // Handle errors if the API call fails
        // If the error is due to a 404 (not found), we can provide a specific message
        setError(`Couldn't find ${type === 'zip' ? 'zip code' : type === 'city' ? 'city' : 'location'}. Try again.`);
        setLoading(false); // Reset loading state
      });
  };

  // Auto-detect location on mount
  useEffect(() => {  // This effect runs once when the component mounts
    if (navigator.geolocation) { // Check if geolocation is supported by the browser
      navigator.geolocation.getCurrentPosition(  // Get the current position
        (position) => {  // If the position is successfully retrieved
          setGeoPermission('granted'); // Update permission state to granted
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude); // Fetch weather data using the coordinates
        },
        () => {
          setGeoPermission('denied');  // If permission is denied, set the state accordingly
          fetchWeather(DEFAULT_LOCATION, 'city'); // Fallback to default location if geolocation fails or is denied
        }
      );
    } else {
      fetchWeather(DEFAULT_LOCATION, 'city'); // If geolocation is not supported, fallback to default location
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render
   // Function to fetch weather data based on coordinates
  const fetchWeatherByCoords = (lat, lon) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    
    axios.get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Couldn't get local weather");
        fetchWeather(DEFAULT_LOCATION, 'city'); // Fallback to default location if geolocation fails
      });
  };
  // Handle search input when the user presses Enter
  const handleSearch = (e) => { // Check if the key pressed is Enter
    if (e.key === 'Enter' && searchInput.trim()) {  // If the input is not empty
      fetchWeather(searchInput, searchType); // Fetch weather data based on the search input and type
    }
  };
  // Function to determine the weather icon based on the weather data
  const getWeatherIcon = () => {
    if (!data.weather) return 'CLEAR_DAY';
    // Check if the weather data is available
    const weatherType = data.weather[0].main.toLowerCase(); // Get the main weather type
    const isDaytime = data.dt > data.sys.sunrise && data.dt < data.sys.sunset; // Check if it's daytime based on the current time and sunrise/sunset times
     // Map the weather type to an icon
    const iconMapping = {
      clear: isDaytime ? 'CLEAR_DAY' : 'CLEAR_NIGHT',
      clouds: 'CLOUDY',
      rain: 'RAIN',
      snow: 'SNOW',
      thunderstorm: 'RAIN',
      drizzle: 'SLEET',
      mist: 'FOG',
      smoke: 'FOG',
      haze: 'FOG',
      fog: 'FOG'
    };

    return iconMapping[weatherType] || 'PARTLY_CLOUDY_DAY';
  };

  return (
    <div className="App">
      <Header/>
      <div className="search-container">
        <div className="search-options">
          <button 
            className={searchType === 'city' ? 'active' : ''} // Highlight the active search type
            onClick={() => setSearchType('city')}  // Set search type to 'city'
          >
            City
          </button>
          <button 
            className={searchType === 'zip' ? 'active' : ''} // Highlight the active search type
            onClick={() => setSearchType('zip')} // Set search type to 'zip'
          >
            ZIP Code
          </button>
        </div>

        <div className='search'>
          <input
            type="text"
            placeholder={
              searchType === 'city' ? "Enter city (e.g. London)" :
              searchType === 'zip' ? "Enter ZIP code (e.g. 10001)" :
              "Enter landmark (e.g. Eiffel Tower)"
            }
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Update search input state on change
            onKeyPress={handleSearch} // Handle search on Enter key press
          />
        </div>
      </div>
   
      {loading ? (
        <p className="loading">  
          {geoPermission === 'prompt' ? "Detecting your location..." : "Loading weather data..."}
        </p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="container">
          <div className='top'>
            <div className='location'>
              <h2>{data.name}, {data.sys?.country}</h2>
              {geoPermission === 'granted' && !searchInput && (
                <span className="location-badge">Your Location</span>
              )}
            </div>
            <div className='description'>
              <p>{data.weather?.[0]?.description || ''}</p>
            </div>
          </div>

          <div className='weather-display'>
            <div className='temp'>
              <p>{data.main ? Math.round((data.main.temp - 273.15) * 9/5 + 32) : ''}°F</p>
            </div>
            <div className='weather-icon-container'>
              <AnimatedWeather
                icon={getWeatherIcon()}
                color={'#4a90e2'}
                size={150}
                animate={true}
              />
            </div>
          </div>

          <div className='bottom'>
            <div className='feels'>
              <p>Feels Like</p>
              <p>{data.main ? Math.round((data.main.feels_like - 273.15) * 9/5 + 32) : ''}°F</p>
            </div>
            <div className='wind'>
              <p>Wind</p>
              <p>{data.wind?.speed || ''} MPH</p>
            </div>
            <div className='humidity'>
              <p>Humidity</p>
              <p>{data.main?.humidity || ''}%</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
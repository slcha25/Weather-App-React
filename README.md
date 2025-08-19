# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Weather App
A responsive weather application built with React that provides real-time weather forecasts for cities, zip

![image_alt](https://github.com/slcha25/Weather-App-React/blob/main/src/assets/weatherApp.jpg?raw=true)

## Usage
1. Select city or zip code for searching the city's weather
2. Inital city which is detected by local machine. If not detect by local machine, it will display the default city weather. 
3. Fetch the weather from Open Weather

## Features
- **Dynamic Typing Animation**: auto-typing header "Real time weather"
- **Automatic location detection**: with user permission
- **React App**: use react app created the weather website
- **Use local enviorment**: use local enviorment to store API
- **React-Animated-weather**: animation weather icon based on current weather
- **Modern UI**: Beautiful gradient background and smooth hover effects

## Technologies
- **Fronted**:
-   - HTML, CSS, JavaScript
    - Typed.js for typing animations
    - React.js(with Hooks) and React Animated weather
 
- **Backed API**:
    - [Open Weather API](https://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=${API_KEY})
      - Free tier requires resgistration for an API Key
      -  Current weather data endpoint
      -  Geolocation endpoint for automatic detection 
    - Axios for API requests

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Credits
- Fonts from [Google Fonts](https://fonts.google.com/)
- Open Weather API [Open Weather](https://api.openweathermap.org)
- Typing animation by [Typed.js](https://github.com/mattboldt/typed.js/)
- color palette inspried by pastel themes

## Contact
Created by [Sandra Chan](https://www.linkedin.com/in/sok-chan/) - feel free to contact me

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

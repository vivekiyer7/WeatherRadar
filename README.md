
# WeatherRadar

A simple website for Weather Dashboard

## Overview

This Weather App allows users to search for weather details of cities, view the current weather, and get a 5-day forecast. The application utilizes the OpenWeatherMap API for weather data and includes features such as autocomplete search, viewing recent searches, and displaying detailed weather information.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Autocomplete Search:**
        The search box is equipped with autocomplete functionality, suggesting city names based on the data available in the cities.json file.

- **Recent Searches:**
        The application maintains a history of the last six searched cities.
        Users can click on a city from the search history to retrieve weather details for that city.

- **Current Weather Display:**
        Upon loading the page, the app displays the weather details of either the last searched city or a default city (e.g., London).

- **5-Day Forecast:**
        The app provides a 5-day forecast for the selected city.
        Each day includes details such as date, temperature, humidity, and wind speed.

- **Responsive Design:**
        The UI is designed to be responsive and user-friendly, ensuring a seamless experience across different devices.

- **LocalStorage:**
        User's search history is stored in the browser's localStorage, allowing for a personalized experience even after page reloads.

## Screenshots

![Screenshot1](/assets/images/finished_new_browser.png)
![Screenshot2](/assets/images/Finished_after.png)

## Deployment

1. Site is live at https://vivekiyer7.github.io/WeatherRadar/

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/vivekiyer7/WeatherRadar.git`
2. Open the `index.html` file in your preferred browser.

## How to Use

Usage

1. Search for a City:
        Enter the name of a city in the search box.
        Use the autocomplete feature to quickly find the desired city.

2. View Weather Details:
        The current weather details for the entered city are displayed, including temperature, humidity, and wind speed.

3. Explore 5-Day Forecast:
        Scroll down to view the 5-day forecast, providing insights into the upcoming weather conditions.

4. Search History:
        Click on a city in the search history to quickly retrieve its weather details.

5. Error Handling:
        If the entered city is not found, the user receives a pop-up message notifying them of the issue.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

### Author

Vivek Iyer

---

Made with ❤️️ by Vivek Iyer

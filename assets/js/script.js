document.addEventListener("DOMContentLoaded", function () {
  //When page loads keep the search box empty
  $("#tags").val("");

  //Load the City as Autocomplete in the Search Box
  $(function () {
    //Get the list of cities from the cities.json file
    var cityname = [];
    for (let j = 0; j < cities_list.length; j++) {
      //append the city names to the cityname variable
      cityname.push(cities_list[j].name);
    }
    //Add the autocomplete feature to the search box
    $("#tags").autocomplete({
      source: cityname,
    });
  });

  function getcitydetails(cityname) {
    //Get the lat and lon of the city
    var lat = 0;
    var lon = 0;
    for (let i = 0; i < cities_list.length; i++) {
      if (cities_list[i].name == cityname) {
        lat = cities_list[i].lat;
        lon = cities_list[i].lon;
        break;
      }
    }

    gettodayweatherdetails(lat, lon, cityname);
    getfutureweatherdetails(lat, lon, cityname);
  }

  function gettodayweatherdetails(lat, lon, cityname) {
    //Get the weather details of the city
    var apikey = "f41ac7fc5765325b802d2654709a4c22";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apikey;
    // Here we run our Fetch call to the OpenWeatherMap API
    fetch(queryURL)
      .then(function (response) {
        // Calling .json() to access the json data stored inside the returned promise
        return response.json();
      })
      // We store all of the retrieved data inside of an object called "data"
      .then(function (data) {
        console.log(data);
        //Retrieve the weather details of the city
        //Get today's date using days.js in the format DD/MM/YYYY
        var todaydate = dayjs().format("DD/MM/YYYY");
        var temp_kelvin = data.main.temp;
        //Convert the temperature from Kelvin to Celsius and round it to 2 decimal places
        var temp_celsius = (temp_kelvin - 273.15).toFixed(2);
        var humidity = data.main.humidity;
        var windspeed_meterpersec = data.wind.speed;
        //Convert the wind speed from meter/sec to KPH and round it to 2 decimal places
        var windspeed_KPH = (windspeed_meterpersec * 3.6).toFixed(2);
        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        //Invoke the function to display the weather details
        displayweatherdetails(
          todaydate,
          temp_celsius,
          humidity,
          windspeed_KPH,
          iconurl,
          cityname
        );
      });
  }

  function displayweatherdetails(
    todaydate,
    temp_celsius,
    humidity,
    windspeed_KPH,
    iconurl,
    cityname
  ) {
    //Display by creating the elements dynamically inside the div in the html in today class

    var todayListEl = $("#todaylist");
    var citynameEl = $("#citydisplayname");
    var todaydateEl = $("#todaydisplaydate");
    var iconurlEl = $("#iconurldisplay");
    var temp_celsiusEl = $("#todaytempdisplay");
    var humidityEl = $("#todayhumiditydisplay");
    var windspeed_KPHEl = $("#todaywindspeedisplay");

    citynameEl.text(cityname);
    todaydateEl.text("(" + todaydate + ")");
    iconurlEl.attr("src", iconurl);
    temp_celsiusEl.text("Temp: " + temp_celsius + " °C");
    humidityEl.text("Humidity: " + humidity + "%");
    windspeed_KPHEl.text("Wind Speed: " + windspeed_KPH + " KPH");
  }

  function getfutureweatherdetails(lat, lon, cityname) {
    //Get the weather details of the city
    var apikey = "f41ac7fc5765325b802d2654709a4c22";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apikey;
    console.log(queryURL);
    // Here we run our Fetch call to the OpenWeatherMap API
    fetch(queryURL)
      .then(function (response) {
        // Calling .json() to access the json data stored inside the returned promise
        return response.json();
      })
      // We store all of the retrieved data inside of an object called "data"
      .then(function (data) {
        console.log(data);
        //Retrieve the weather details of the city

        //Calculate the date of the next 5 days and store in Array. Use days.js to calculate the date
        futuredates = [];
        futureicourl = [];
        futuretemp = [];
        futurehumidity = [];
        futurewindspeed = [];
        var temp_date = "";

        //Parse the data to get the weather details for the next 5 days and store in Array
        // while matching the date in format 00:00:00. If that matches, store the weather details in the Array
        for (let j = 0; j < data.list.length; j++) {
          if (data.list[j].dt_txt.includes("00:00:00")) {
            temp_date = data.list[j].dt_txt
              .split(" ")[0]
              .split("-")
              .reverse()
              .join("/");
            futuredates.push(temp_date);
            futureicourl.push(
              "http://openweathermap.org/img/w/" +
                data.list[j].weather[0].icon +
                ".png"
            );
            futuretemp.push((data.list[j].main.temp - 273.15).toFixed(2));
            futurehumidity.push(data.list[j].main.humidity);
            futurewindspeed.push((data.list[j].wind.speed * 3.6).toFixed(2));
          }
        }

        for (let k = 0; k < futuredates.length; k++) {
          console.log(futuredates[k]);
          console.log(futureicourl[k]);
          console.log(futuretemp[k]);
          console.log(futurehumidity[k]);
          console.log(futurewindspeed[k]);
        }
      });
  }

  //When the user clicks the search button or presses enter search for the city
  $("#search-button").click(function (event) {
    event.preventDefault();
    //Get the city name from the search box
    var city = $("#tags").val();
    //Check if the city name is empty
    if (city == "") {
      //If empty show error message
      $("#error").html("Please enter a city name");
    } else {
      getcitydetails(city);
    }
  });
});

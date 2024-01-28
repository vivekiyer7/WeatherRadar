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
        //Parse the data to get the weather details for the next 5 days and store in Array
        // while matching the date in format 00:00:00. If that matches, store the weather details in the Array
        //Calculate the date of the next 5 days and store in Array. Use days.js to calculate the date
        futuredates = [];
        futureicourl = [];
        futuretemp = [];
        futurehumidity = [];
        futurewindspeed = [];
        var temp_date = "";

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

        //Display the weather details for the next 5 days here by creating the elements dynamically inside the div in the html in future class
        var ForcastheadingEl = $("#forcastheading");
        ForcastheadingEl.text("5-Day Forcast");

        var firstfuturedayEl = $("#firstfutureday");
        var secondfuturedayEl = $("#secondfutureday");
        var thirdfuturedayEl = $("#thirdfutureday");
        var fourthfuturedayEl = $("#fourthfutureday");
        var fifthfuturedayEl = $("#fifthfutureday");

        //Now create and display inside each futureday container the weather details
        //First Day

        //create a header element and append to the firstfuturedayEl
        var futuredayheaderEl = $("<h5>");
        futuredayheaderEl.text(futuredates[0]);

        //create an image element and append to the firstfuturedayEl
        var futuredayiconurlEl = $("<img>");
        futuredayiconurlEl.attr("src", futureicourl[0]);

        //create a paragraph element and append to the firstfuturedayEl
        var futuredaytempEl = $("<p>");
        futuredaytempEl.text("Temp: " + futuretemp[0] + " °C");

        //create a paragraph element and append to the firstfuturedayEl
        var futuredaywindspeedEl = $("<p>");
        futuredaywindspeedEl.text("Wind : " + futurewindspeed[0] + " KPH");

        //create a paragraph element and append to the firstfuturedayEl
        var firstfuturedayhumidityEl = $("<p>");
        firstfuturedayhumidityEl.text("Humidity: " + futurehumidity[0] + "%");

        firstfuturedayEl.append(futuredayheaderEl);
        firstfuturedayEl.append(futuredayiconurlEl);
        firstfuturedayEl.append(futuredaytempEl);
        firstfuturedayEl.append(futuredaywindspeedEl);
        firstfuturedayEl.append(firstfuturedayhumidityEl);

        //Second Day
        //create a header element and append to the secondfuturedayEl
        var futuredayheaderEl = $("<h5>");
        futuredayheaderEl.text(futuredates[1]);

        //create an image element and append to the secondfuturedayEl
        var futuredayiconurlEl = $("<img>");
        futuredayiconurlEl.attr("src", futureicourl[1]);

        //create a paragraph element and append to the secondfuturedayEl
        var futuredaytempEl = $("<p>");
        futuredaytempEl.text("Temp: " + futuretemp[1] + " °C");

        //create a paragraph element and append to the secondfuturedayEl
        var futuredaywindspeedEl = $("<p>");
        futuredaywindspeedEl.text("Wind : " + futurewindspeed[1] + " KPH");

        //create a paragraph element and append to the secondfuturedayEl
        var secondfuturedayhumidityEl = $("<p>");
        secondfuturedayhumidityEl.text("Humidity: " + futurehumidity[1] + "%");

        secondfuturedayEl.append(futuredayheaderEl);
        secondfuturedayEl.append(futuredayiconurlEl);
        secondfuturedayEl.append(futuredaytempEl);
        secondfuturedayEl.append(futuredaywindspeedEl);
        secondfuturedayEl.append(secondfuturedayhumidityEl);

        //Third Day
        //create a header element and append to the thirdfuturedayEl
        var futuredayheaderEl = $("<h5>");
        futuredayheaderEl.text(futuredates[2]);

        //create an image element and append to the thirdfuturedayEl
        var futuredayiconurlEl = $("<img>");
        futuredayiconurlEl.attr("src", futureicourl[2]);

        //create a paragraph element and append to the thirdfuturedayEl
        var futuredaytempEl = $("<p>");
        futuredaytempEl.text("Temp: " + futuretemp[2] + " °C");

        //create a paragraph element and append to the thirdfuturedayEl
        var futuredaywindspeedEl = $("<p>");
        futuredaywindspeedEl.text("Wind : " + futurewindspeed[2] + " KPH");

        //create a paragraph element and append to the thirdfuturedayEl
        var thirdfuturedayhumidityEl = $("<p>");
        thirdfuturedayhumidityEl.text("Humidity: " + futurehumidity[2] + "%");

        thirdfuturedayEl.append(futuredayheaderEl);
        thirdfuturedayEl.append(futuredayiconurlEl);
        thirdfuturedayEl.append(futuredaytempEl);
        thirdfuturedayEl.append(futuredaywindspeedEl);
        thirdfuturedayEl.append(thirdfuturedayhumidityEl);

        //Fourth Day
        //create a header element and append to the fourthfuturedayEl
        var futuredayheaderEl = $("<h5>");
        futuredayheaderEl.text(futuredates[3]);

        //create an image element and append to the fourthfuturedayEl
        var futuredayiconurlEl = $("<img>");
        futuredayiconurlEl.attr("src", futureicourl[3]);

        //create a paragraph element and append to the fourthfuturedayEl
        var futuredaytempEl = $("<p>");
        futuredaytempEl.text("Temp: " + futuretemp[3] + " °C");

        //create a paragraph element and append to the fourthfuturedayEl
        var futuredaywindspeedEl = $("<p>");
        futuredaywindspeedEl.text("Wind : " + futurewindspeed[3] + " KPH");

        //create a paragraph element and append to the fourthfuturedayEl
        var fourthfuturedayhumidityEl = $("<p>");
        fourthfuturedayhumidityEl.text("Humidity: " + futurehumidity[3] + "%");

        fourthfuturedayEl.append(futuredayheaderEl);
        fourthfuturedayEl.append(futuredayiconurlEl);
        fourthfuturedayEl.append(futuredaytempEl);
        fourthfuturedayEl.append(futuredaywindspeedEl);
        fourthfuturedayEl.append(fourthfuturedayhumidityEl);

        //Fifth Day
        //create a header element and append to the fifthfuturedayEl
        var futuredayheaderEl = $("<h5>");
        futuredayheaderEl.text(futuredates[4]);

        //create an image element and append to the fifthfuturedayEl
        var futuredayiconurlEl = $("<img>");
        futuredayiconurlEl.attr("src", futureicourl[4]);

        //create a paragraph element and append to the fifthfuturedayEl
        var futuredaytempEl = $("<p>");
        futuredaytempEl.text("Temp: " + futuretemp[4] + " °C");

        //create a paragraph element and append to the fifthfuturedayEl
        var futuredaywindspeedEl = $("<p>");
        futuredaywindspeedEl.text("Wind : " + futurewindspeed[4] + " KPH");

        //create a paragraph element and append to the fifthfuturedayEl
        var fifthfuturedayhumidityEl = $("<p>");
        fifthfuturedayhumidityEl.text("Humidity: " + futurehumidity[4] + "%");

        fifthfuturedayEl.append(futuredayheaderEl);
        fifthfuturedayEl.append(futuredayiconurlEl);
        fifthfuturedayEl.append(futuredaytempEl);
        fifthfuturedayEl.append(futuredaywindspeedEl);
        fifthfuturedayEl.append(fifthfuturedayhumidityEl);
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

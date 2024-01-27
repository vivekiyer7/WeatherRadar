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
});

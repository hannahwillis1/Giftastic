var topics = {
  searchSport: "",
  sports: [
    "Soccer",
    "Basketball",
    "Baseball",
    "Surfing",
    "Badminton",
    "Bowling"
  ]
};

function init() {
  for (i = 0; i < topics.sports.length; i++) {
    console.log(topics.sports[i]);
    $("#topics").append(
      "<button class='btn-primary topic-btn'>" + topics.sports[i] + "</button>"
    );
  }
}

function search() {
  $("#giphy").html("");
  topics.searchSport = $("#search")
    .val()
    .trim();
  //Set queryURL for AJAX Request
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topics.searchSport +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  //AJAX Request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(response => {
    console.log(response);
    for (i = 0; i < response.data.length; i++) {
      //Add raiting and img to html
      $("#giphy").append(
        "<div class= 'gif-div'>Rating: " +
          response.data[i].rating.toUpperCase() +
          "<br>" +
          "<img data-name= " +
          response.data[i].images.original.url +
          " src= " +
          response.data[i].images.original_still.url +
          " class= 'gif-img'></div>"
      );
    }
  });
  //Empty the countries array & create new button
  topics.sports = [];
  //Add new country to the array
  topics.sports.push(topics.searchSport);
  //Clear #search
  $("#search").val("");
  //Run init()
  init();
}

function pressTopicBtn() {
  $("#giphy").html("");
  var topicBtnValue = $(this).text();
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicBtnValue +
    "&api_key=gm0Sioy3qFVRdnVKyvQeuxfFAsWFMGf7";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(response => {
    console.log(response);
    for (i = 0; i < response.data.length; i++) {
      //Add raiting and img to html
      $("#giphy").append(
        "<div class= 'gif-div'>Rating: " +
          response.data[i].rating.toUpperCase() +
          "<br>" +
          "<img data-name= " +
          response.data[i].images.original.url +
          " src= " +
          response.data[i].images.original_still.url +
          " class= 'gif-img'></div>"
      );
    }
  });
}

//In creating each image, I added a data-name containing the gif url. Here I swap that with the still image url being used in the src.
function changeImage() {
  var temp = $(this).attr("data-name");
  $(this).attr("data-name", $(this).attr("src"));
  $(this).attr("src", temp);
}

//=======================
//MAIN PROCESS
//=======================
//Initialize on start
init();

//When the Submit button is clicked the search function is called
$("#search-btn").on("click", search);
//When the Country buttons are clicked, the presstopicBtn function is called
$(document).on("click", ".topic-btn", pressTopicBtn);
//When the gif images are clicked, changeImage function is called
$(document).on("click", ".gif-img", changeImage);

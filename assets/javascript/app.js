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

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topics.searchSport +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(response => {
    console.log(response);
    for (i = 0; i < response.data.length; i++) {
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

  topics.sports = [];

  topics.sports.push(topics.searchSport);

  $("#search").val("");

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

function changeImage() {
  var temp = $(this).attr("data-name");
  $(this).attr("data-name", $(this).attr("src"));
  $(this).attr("src", temp);
}

init();

$("#search-btn").on("click", search);

$(document).on("click", ".topic-btn", pressTopicBtn);

$(document).on("click", ".gif-img", changeImage);

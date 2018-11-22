var sports = ["Soccer", "Football", "Surfing", "Sailing", "Basketball"];

$(document).on("click", ".topicTop", function() {
  var sport = $(this).attr("data-topic");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    sport +
    "&api_key=gm0Sioy3qFVRdnVKyvQeuxfFAsWFMGf7";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var results = response.data;

    $("#allSports").empty();

    for (var i = 0; i < results.length; i++) {
      var sportsDiv = $('<div class="topic pull-left">');
      var p = $("<p>").text("Rating: " + results[i].rating);
      var sportImage = $("<img>");

      sportImage.attr("src", results[i].images.fixed_height_still.url);

      sportImage.addClass("gif");

      sportImage.attr("data-state", "still");

      sportImage.attr("data-animate", results[i].images.fixed_height.url);

      sportImage.attr("data-still", results[i].images.fixed_height_still.url);

      sportssDiv.append(p);
      sportsDiv.append(sportImage);

      $("#topicsHere").prepend(sportssDiv);
    }
  });
});

function renderButtons() {
  $("#sportsButtons").empty();

  for (var i = 0; i < sports.length; i++) {
    var a = $("<button>");
    a.addClass("topicTop btn btn-default");
    a.attr("data-topic", sports[i]);
    a.text(sports[i]);
    $("#sportsButtons").append(a);
  }
}

$(document).ready(function() {
  renderButtons();
  $("#addSport").on("click", function() {
    var newSport = $("#topic-input")
      .val()
      .trim();
    // The topic from the textbox is then added to our array
    sports.push(newSport);

    // The button is then rendered
    renderButtons();
    // This erases the input once the button is submit button is clicked
    $("#topic-input").val("");
    // this is so that the page doesn't refresh once we click on the 'submit' button
    return false;
  });
});

// This function handles the state of the gifs
$(document).on("click", ".gif", function() {
  if ($(this).attr("data-state") == "still") {
    //if the state is still...
    $(this).attr("src", $(this).data("animate")); //... then change the src to 'animate' (which we get from Giphy API)
    $(this).attr("data-state", "animate"); //... and change the name of the state to 'animate'
  } else {
    //conversely, if the state is 'animate'...
    $(this).attr("src", $(this).data("still")); // then change the src to 'still' (which we get from Giphy API)
    $(this).attr("data-state", "still"); // and change the state to 'still'
  }
});

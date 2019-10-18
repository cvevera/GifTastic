var character = ["Jar Jar Binks", "Luke Skywalker", "Darth Vader", "Han Solo", "Princess Leia", "Admiral Akbar", "Rey", "Boba Fett", "C3PO", "R2D2"]

    
function createButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < character.length; i++) {

        var g = $("<button>");
        g.addClass("character-btn");
        g.attr("data-name", character[i]);
        g.text(character[i]);
        $("#buttons-view").append(g);
    }
};



function displayGifInfo() {

    var character = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=gUOyes5bzalWC2SAOM63qdWpM2RyhatG&limit=10";

    $("#gifs").empty()
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var starWarsCharacter = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var characterImage = $("<img>");
                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-state", "still");
                characterImage.attr("id", "gifs");
                console.log(characterImage)
                starWarsCharacter.append(p);
                starWarsCharacter.append(characterImage);

                $("#gifs").prepend(starWarsCharacter);
            }
        })

};

$("#add-character").on("click", function (event) {
    event.preventDefault();
    var input = $("#character-input").val().trim();

    character.push(input);

    createButtons();
    console.log(character)
});
function animateGif() {

    var state = $(this).attr("data-state");
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
};

$(document).on("click", ".character-btn", displayGifInfo);
$(document).on("click", "#gifs", animateGif);
createButtons()

(function () {

    let data = [];

    $(".btn-primary").on("click", function() {
        getData(populateHouses);
    });

    // display character image when part of the character name is entered in input box and search button is clicked
    $(".btn-default").on("click", function() {
        let search = $("input")[0].value;

        data.forEach(character => {
            if (character.name.includes(search)) {
                $("#results").empty();       
                $(`<img src="${character.image}">`).appendTo("#results");
            }
        });
    });

    $("a").on("click", function(event) {
        event.preventDefault();

        $("li").removeClass("active");
        $(this).parent().addClass("active"); // activate the nav tab that was clicked on

        $(".house").addClass("hidden");

        let houseId = $(this).attr("href");

        $(houseId).removeClass("hidden");
    });

    // populate each HTML table with the data that it receives based on the "house" property
    function populateHouses(characters) {
        characters.forEach(character => {
            data.push(character); // store all API data in an array of objects for use by search

            if(character.patronus === "" && character.house !== "") character.patronus = "-";
            if(character.house === "") character.house = "None";

            $(`<tr><td>${character.name}</td><td>${character.house}</td><td>${character.patronus}</td></tr>`).appendTo(`#${character.house} > table > tbody`);
        });
    }

    function getData(callback) {
        let httpRequest = new XMLHttpRequest();

        httpRequest.addEventListener("load", function () {
            callback(JSON.parse(httpRequest.responseText));
        });

        httpRequest.open("GET", "https://hp-api.herokuapp.com/api/characters");
        httpRequest.send();
    }
    // getData will pass the callback function an array of contact objects 
    // with the following structure

    // {
    //  "name": "Harry Potter",
    //  "species": "human",
    //  "gender": "male",
    //  "house": "Gryffindor",
    //  "dateOfBirth": "31-07-1980",
    //  "yearOfBirth": 1980,
    //  "ancestry": "half-blood",
    //  "eyeColour": "green",
    //  "hairColour": "black",
    //  "wand": {
    //      "wood": "holly",
    //      "core": "phoenix feather",
    //      "length": 11
    //  },
    //  "patronus": "stag",
    //  "hogwartsStudent": true,
    //  "hogwartsStaff": false,
    //  "actor": "Daniel Radcliffe",
    //  "alive": true,
    //  "image": "http://hp-api.herokuapp.com/images/harry.jpg"
    // }

})();
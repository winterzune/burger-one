var burgerTime = function() {
    console.log("burger, burger time!.");

    $("#eat-burger").on("click", "li", eatBurger)
    $("#burger-form").on("submit", addNewBurger);
}

var eatBurger = function() {
    var burger = $(this);
    var index = burger.attr("burger-data");
    var options = {
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({ devoured: true })
    }

    $.ajax("/api/burgers/" + index, options).then(function(result) 
    {
        
        if(result) {
            burger.appendTo(".devoured");
        }        
    })
}

var addNewBurger = function(event)
{
    event.preventDefault()
    console.log("insert-new-burger-here-fam")

    var burger = $("#burger-name").val();
    var options = {
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({ newBurger: burger })
    }

    $.ajax("/api/burgers", options).then(function(result) 
    {
        
        if(result) {
            var newBurger = $("<li>");
            newBurger.text(burger);
            newBurger.attr("burger-data", result.insertId);
            newBurger.appendTo("#eat-list");
        }        
    })
}

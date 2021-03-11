$(document).ready(function() {

    const getData = function() {
        
        //get user input
        var userInput = $("#search").val().trim().replace(/ /g,"_");
        
        //get the user data 
        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`,
            type: "get",
            success: function(res) {

                // console.log("****",res);

                // check if meal are available
                var cardMarkup = ""
                if (res.meals) {
                    //create string html
                    for (var i = 0; i < res.meals.length; i++) {
                        cardMarkup += `
                            <div class="card-column">
                                <div class="info-card">
                                    <h2>${res.meals[i].strMeal}</h2>
                                    <img src="${res.meals[i].strMealThumb}">
                                </div>
                            </div>
                        `;
                    }
                }

                //converts string markup into html and renders it
                $("#recipe-list").html(cardMarkup);
            }
        });
    } 
    
    //on click of a button search for the data and redner it
    $(".search-btn").on("click",getData);
});
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
var blueberies = document.querySelector;

//fetch request for mealDB
function getMeal(ingredient) {
    //set api url to given url + the search term of the ingredient
    var mealByIngredientURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
    //fetching
    fetch(mealByIngredientURL)
    // setting the response to json
    .then((data) => data.json())
    // function to push the id into the idArray
    .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            var mealName = item.strMeal;
            var mealImg = item.strMealThumb;
            console.log(mealName);
            console.log(mealImg);
        }
        // console.log(idArray);
        // console.log(idArray[0])
    });
}


getMeal("chicken");
        //get the user data 
        $.ajax({
            url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?=gin`,
            type: "get",
            success: function(res) {
  
                // console.log("****",res);
  
                // check if drinks are available
                var cardMarkup = ""
                if (res.drinks) {
                    //create string html
                    for (var i = 0; i < res.drinks.length; i++) {
                        cardMarkup += `
                            <div class="card-column">
                                <div class="info-card">
                                    <h2>${res.drinks[i].strDrink}</h2>
                                    <img src="${res.drinks[i].strDrinkThumb}">
                                </div>
                            </div>
                        `;
                    }
                }
  
                //converts string markup into html and renders it
                $("#recipe-list").html(cardMarkup);
            }
        });
    
    
    //on click of a button search for the data and redner it
  //  $(".search-btn").on("click",getData);
 
  var blueberries = document.querySelector;
  
  // fetch for Drink
  function getDrinkID(ingredient) {
    // Api url + ingredient
    var drinkByIngredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    fetch(drinkByIngredientURL)
    // response to json
    .then((data) => data.json())
    // push the id
    .then(function (data) {
        console.log(data);
        for (let i =0; i < data.drinks.lenght; i++) {
            const item = data[i];
            var drinkName = item.strDrink;
            var drinkImg = item.strDrinkThumb;
            console.log(drinkName);
            console.log(drinkImg);
            
        }
    });
  }
  
    getDrinkID("gin");
    var blueberies = document.querySelector
  
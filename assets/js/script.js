// Variables to select page items
var searchText = document.querySelector("#search-text");
var foodBtn = document.querySelector("#food-btn");
var drinkBtn = document.querySelector("#drink-btn");
var recentContainer = document.querySelector("#recent-container");
var favoritesContainer = document.querySelector("#favorites-container");
var recentList = document.querySelector("#recent-list");
var favoritesList = document.querySelector("#favorites-list");
var savedFood = document.querySelector("#food-items");
var savedDrinks = document.querySelector("#drink-items");
// var favoriteBtn = document.querySelector("#favorite-btn");
// Instantiating localStorage
var foodStorage = JSON.parse(localStorage.getItem("food")) || [];
var drinkStorage = JSON.parse(localStorage.getItem("drinks")) || [];
var favoriteStorage = JSON.parse(localStorage.getItem("favorites")) || [];

//fetch request for mealDB
function getMeal(ingredient) {
  //set api url to given url + the search term of the ingredient
  var mealByIngredientURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
  //fetching
  fetch(mealByIngredientURL)
    // setting the response to json
    .then((data) => data.json())
    .then(function (data) {
      var cardMarkup = "";
      if (data.meals) {
        //create string html
        for (var i = 0; i < data.meals.length; i++) {
          cardMarkup += 
          `
            <div class="card-column">
                <div class="info-card">
                <i class="far fa-star fav-btn"></i>
                    <h2>${data.meals[i].strMeal}</h2>
                    <img src="${data.meals[i].strMealThumb}">
                </div>
            </div>
          `;
        }
      }
  
      //converts string markup into html and renders it
      $("#recipe-list").html(cardMarkup);
    })
    .catch(function(e){
      // add some text to the screen saying there are no results for that ingredient
      console.log(e);
    });
}
// fetch request to get specific meals
function getMealbyID (id) {
  var mealByIdURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(mealByIdURL)
  .then((data) => data.json())
  .then(function (data) {
    console.log(data.meals[0]);
    var meal = data.meals[0];
    var recipeName = meal.strMeal;
    var recipeImg = meal.strMealThumb;
    // var ingredients = [];
    // ingredients.push(meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5, meal.strIngredient6, meal.strIngredient7, meal.strIngredient8, meal.strIngredient9, meal.strIngredient10, meal.strIngredient11, meal.strIngredient12, meal.strIngredient13, meal.strIngredient14, meal.strIngredient15, meal.strIngredient16, meal.strIngredient17, meal.strIngredient18, meal.strIngredient19, meal.strIngredient20,);
    // var instructions = meal.strInstructions;
  })
  .catch(function(e) {
    // add some text to screen saying there is no meal with that id
    console.log(e)
  })
}

// Local storage for recent food items
function recentFoodStorage(value) {
  if (foodStorage.length === 5) {
    foodStorage.pop();
  }
  foodStorage.unshift(value);
  localStorage.setItem("food", JSON.stringify(foodStorage));
  populateRecentFood(foodStorage);
}
// Local storage for recent drink items
function recentDrinkStorage(value) {
  if (drinkStorage.length === 5) {
    drinkStorage.pop();
  }
  drinkStorage.unshift(value);
  localStorage.setItem("drinks", JSON.stringify(drinkStorage));
  populateRecentDrink(drinkStorage);
}
 // local storage for favorite meals
function favoriteItemsStorage(value) {
  if (favoriteStorage === 5) {
    favoriteStorage.pop();
  }
  favoriteStorage.unshift(value);
  localStorage.setItem("favorites", favoriteStorage);
  populateFavorites(favoriteStorage);
}

// Add recemt searches to #recent-container
function populateRecentFood(arr) {
  savedFood.innerHTML = "<h3>Food</h3>";
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    var li = document.createElement("li");
    li.innerText = item;
    savedFood.append(li);
  }
}
// Add recemt searches to #recent-container
function populateRecentDrink(arr) {
  savedDrinks.innerHTML = "<h3>Drinks</h3>";
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    var li = document.createElement("li");
    li.innerText = item;
    savedDrinks.append(li);
  }
}
// Add favorite meals to #favorites-container
function populateFavorites(arr) {
  favoritesList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    var li = document.createElement("li");
    li.innerText = item;
    favoritesList.append(li);
  }
}
// event when the food button is clicked to store the search term to recent searches and get the meals for the searched value
foodBtn.addEventListener("click", function () {
  getMeal(searchText.value);
  recentFoodStorage(searchText.value);
});

// event when the drink button is clicked to store the search term to recent searches and get the drinks for the searched value
drinkBtn.addEventListener("click", function () {
  recentDrinkStorage(searchText.value);
  getDrink(searchText.value);
});

// event to re search for the selected value when an item in the recent searches list is clicked on
recentContainer.addEventListener("click", function (e) {
  var element = e.target;
  var text = element.textContent;
  if(element.matches("li")) {
    getMeal(text);
    getDrink(text);
  }
})
//  event to re search for the selected value when an item in the favorite items list is clicked on
favoritesContainer.addEventListener("click", function (e) {
  var element = e.target;
  var text =  element.textContent;
  if(element.matches('li')) {
    getMealbyID(text);
    getDrinkbyID(text);
  }
})


// Initial population of the recent searches and favorite items lists
// populateRecent(recentStorage);
populateRecentDrink(drinkStorage);
populateRecentFood(foodStorage);
populateFavorites(favoriteStorage);

// fetch for Drink
function getDrink(ingredient) {
  // Api url + ingredient
  var drinkByIngredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  fetch(drinkByIngredientURL)
    // response to json
    .then((data) => data.json())
    .then(function (data) {

      console.log("drink data: ",data);

      var cardMarkup = "";
          if (data.drinks) {
            //create string html
            for (var i = 0; i < data.drinks.length; i++) {
              cardMarkup += 
              `
                <div class="card-column">
                    <div class="info-card">
                    <i class="far fa-star fav-btn"></i>
                        <h2>${data.drinks[i].strDrink}</h2>
                        <img src="${data.drinks[i].strDrinkThumb}">
                    </div>
                </div>
                <br> 
              `;
            }
          }
      
          //converts string markup into html and renders it
          $("#recipe-list").html(cardMarkup);
    })
    .catch(function(e) {
      // add some text to screen saying there are no drinks with that ingredient
      console.log(e)
    });
}

//event bubble set child deligator
document.querySelector("#recipe-list").addEventListener("click", function(e) {
  if (e.target.className.indexOf("fav-btn") > -1) {
    handleFavStarClick()
  } 
});

//handle fav start click
const handleFavStarClick = () => {
  console.log("**********fav start clicked")
  //do stuff here on fav star click *********** code here
};

function getDrinkbyID (id) {
  var drinkByIdURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(drinkByIdURL)
  .then((data) => data.json())
  .then(function (data) {
    // console.log(data.drinks[0]);
    var meal = data.drinks[0];
    var recipeName = meal.strDrink;
    var recipeImg = meal.strDrinkThumb;
    // var ingredients = [];
    // ingredients.push(meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5, meal.strIngredient6, meal.strIngredient7, meal.strIngredient8, meal.strIngredient9, meal.strIngredient10, meal.strIngredient11, meal.strIngredient12, meal.strIngredient13, meal.strIngredient14, meal.strIngredient15, meal.strIngredient16, meal.strIngredient17, meal.strIngredient18, meal.strIngredient19, meal.strIngredient20,);
    // var instructions = meal.strInstructions;
  })
  .catch(function(e) {
    // add some text to screen saying there is no drink with that id
    console.log(e)
  })
}

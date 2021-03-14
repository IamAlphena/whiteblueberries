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
      // console.log(data);
      var cardMarkup = "";
      if (data.meals) {
        //create string html
        for (var i = 0; i < data.meals.length; i++) {
          cardMarkup += 
          `
            <div class="card-column">
                <div class="info-card">
                <i class="far fa-star fav-btn" id="${data.meals[i].idMeal}" data-type="meal"></i>
                    <h3>${data.meals[i].strMeal}</h3>
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
function getMealbyName (name) {
  var mealByNameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(mealByNameURL)
  .then((data) => data.json())
  .then(function (data) {
    console.log(data);
    var cardMarkup = "";
      //create string html
        cardMarkup += 
        `
          <div class="info-card">
            <h3>${data.meals[0].strMeal}</h3>
              <img src="${data.meals[0].strMealThumb}">
              <ul>
                <li><a href="${data.meals[0].strSource}">Link to Recipe</a></li>
                <li><a href="${data.meals[0].strYoutube}">Recipe Video</a></li>
              </ul>
            </div>
          </div>
        `;
    //converts string markup into html and renders it
    $("#recipe-list").html(cardMarkup);
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
  if (favoriteStorage.length === 5) {
    favoriteStorage.pop();
  }
  favoriteStorage.unshift(value);
  localStorage.setItem("favorites", JSON.stringify(favoriteStorage));
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
    var item = arr[i].recipeName;
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

// event to re search for the selected value when an item in the recent searched meal list is clicked on
savedFood.addEventListener("click", function (e) {
  var element = e.target;
  var text = element.textContent;
  if(element.matches("li")) {
    getMeal(text);
  }
})
// event to re search for the selected value when an item in the recent searched drinks list is clicked on
savedDrinks.addEventListener("click", function (e) {
  var element = e.target;
  var text = element.textContent;
  if(element.matches("li")) {
    getDrink(text);
  }
})
//  event to re search for the selected value when an item in the favorite items list is clicked on
favoritesContainer.addEventListener("click", function (e) {
  var element = e.target;
  var text =  element.textContent;
  if(element.matches('li')) {
    if (favoriteStorage.some(e => e.recipeName === text)) {
      var item = favoriteStorage.find(e => e.recipeName === text);
      if  (item.type === 'meal') {
        getMealbyName(item.recipeName);
      } else {
        getDrinkbyName(item.recipeName);
      }
    }
  }
})

//event to set items to the favorites list
document.querySelector("#recipe-list").addEventListener("click", function(e) {
  var element = e.target;
  if (element.matches('i')) {
    var id = element.id;
    var type = element.getAttribute('data-type');
    var h3 = element.parentElement.getElementsByTagName('h3');
    var recipeName = h3[0].textContent;
    var storageItem = {
      recipeName: recipeName,
      id: id,
      type: type,
    };
    favoriteItemsStorage(storageItem);
    populateFavorites(favoriteStorage);
  }
});



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

      // console.log("drink data: ",data);

      var cardMarkup = "";
          if (data.drinks) {
            //create string html
            for (var i = 0; i < data.drinks.length; i++) {
              cardMarkup += 
              `
                <div class="card-column">
                    <div class="info-card">
                    <i class="far fa-star fav-btn" id="${data.drinks[i].idDrink}" data-type="drink"></i>
                        <h3>${data.drinks[i].strDrink}</h3>
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


//handle fav start click
const handleFavStarClick = () => {
  console.log("**********fav start clicked")
  console.log(this);
  //do stuff here on fav star click *********** code here
};

function getDrinkbyName (name) {
  var drinkByIdURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(drinkByIdURL)
  .then((data) => data.json())
  .then(function (data) {
    console.log(data)
    var cardMarkup = "";
    //create string html
      cardMarkup += 
      `
        <div class="info-card">
          <h3>${data.drinks[0].strDrink}</h3>
            <img src="${data.drinks[0].strDrinkThumb}">
            <ul>
            <li><a href="${data.drinks[0].strSource}">Link to Recipe</a></li>
            <li><a href="${data.drinks[0].strYoutube}">Recipe Video</a></li>
            </ul>
          </div>
        </div>
      `;
  //converts string markup into html and renders it
  $("#recipe-list").html(cardMarkup);
  })
  .catch(function(e) {
    // add some text to screen saying there is no drink with that id
    console.log(e)
  })
}

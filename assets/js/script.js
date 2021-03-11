// $(document).ready(function() {

//     const getData = function() {

//         //get user input
//         var userInput = $("#search").val().trim().replace(/ /g,"_");

//         //get the user data
//         $.ajax({
//             url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`,
//             type: "get",
//             success: function(res) {

//                 // console.log("****",res);

//                 // check if meal are available
//                 var cardMarkup = ""
//                 if (res.meals) {
//                     //create string html
//                     for (var i = 0; i < res.meals.length; i++) {
//                         cardMarkup += `
//                             <div class="card-column">
//                                 <div class="info-card">
//                                     <h2>${res.meals[i].strMeal}</h2>
//                                     <img src="${res.meals[i].strMealThumb}">
//                                 </div>
//                             </div>
//                         `;
//                     }
//                 }

//                 //converts string markup into html and renders it
//                 $("#recipe-list").html(cardMarkup);
//             }
//         });
//     }

//     //on click of a button search for the data and redner it
//     $(".search-btn").on("click",getData);
// });




var searchText = document.querySelector("#search-text");
var foodBtn = document.querySelector("#food-btn");
var drinkBtn = document.querySelector("#drink-btn");
var recentContainer = document.querySelector("#recent-container");
var recentList = document.querySelector("#recent-list");
var recentStorage = [];
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
      console.log(data);
      for (let i = 0; i < data.meals.length; i++) {
        var item = data.meals[i];
        var mealName = item.strMeal;
        var mealImg = item.strMealThumb;
        console.log(mealName);
        console.log(mealImg);
      }
    });
}

//local storage for recent items
function recentItemsStorage() {
  console.log(searchText.value);
  if (localStorage.getItem('recents')) {
      recentStorage = JSON.parse(localStorage.getItem('recents'));
      recentStorage.unshift(searchText.value);
      if (recentStorage.length > 5) {
          recentStorage.pop();
      }
      localStorage.setItem('recents',JSON.stringify(recentStorage));
      console.log(recentStorage);
  } else {
      recentStorage.unshift(searchText.value);
      localStorage.setItem('recents',JSON.stringify(recentStorage));
  }
  populateRecent(recentStorage);
}

foodBtn.addEventListener("click", function (e) {
  e.preventDefault();
  recentItemsStorage();
});

// Add ul with li s to #recent-container
function populateRecent (arr) {
    recentList.innerHTML = "";
    recentStorage = JSON.parse(localStorage.getItem('recents'));
    for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        var li = document.createElement('li');
        li.innerText = item;
        recentList.append(li);
    }

}

populateRecent(recentStorage);
getMeal("chicken");

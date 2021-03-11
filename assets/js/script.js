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
// Concise
var recentStorage = JSON.parse(localStorage.getItem("recents")) || [];

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
      for (let i = 0; i < data.meals.length; i++) {
        var item = data.meals[i];
        var mealName = item.strMeal;
        var mealImg = item.strMealThumb;
        console.log(mealName);
        console.log(mealImg);
      }
    });
}
// Local storage for recent items
// Takes in a value
// Stores it in local storage
function recentItemsStorage(value) {
  // If the array has 5 elements remove the oldest
  // Add new item to the beginning of the array
  if (recentStorage.length === 5) {
    // Remove last item
    recentStorage.pop();
  }
  // Add item to front of array
  recentStorage.unshift(value);
  localStorage.setItem("recents", JSON.stringify(recentStorage));
  populateRecent(recentStorage);
}
foodBtn.addEventListener("click", function (e) {
  e.preventDefault();
  recentItemsStorage(searchText.value);
});
// Add ul with li s to #recent-container
function populateRecent(arr) {
  recentList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    var li = document.createElement("li");
    li.innerText = item;
    recentList.append(li);
  }
}
populateRecent(recentStorage);
getMeal("chicken");
<<<<<<< HEAD
var blueberies = document.querySelector
=======
>>>>>>> ec16f94e4913e634c946b12c22a0c67a07d54f07


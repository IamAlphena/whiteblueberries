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


getMeal("chicken");

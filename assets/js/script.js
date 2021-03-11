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
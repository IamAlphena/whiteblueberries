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
var blueberies = document.querySelector

// declare a function
function makeCookies (flavor, servedWarm) {
    console.log(servedWarm);

    if (servedWarm){
        console.log(`here is a warm ${flavor} cookies`);
    } else{
        console.log(`here is a cold ${flavor} cookies`);
    }
    
}
// call a function
makeCookies("sugar", true);
makeCookies("chocolate chip", false);

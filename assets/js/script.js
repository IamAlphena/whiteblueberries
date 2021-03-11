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
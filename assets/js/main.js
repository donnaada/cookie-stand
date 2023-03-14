// Store the min/max hourly customers, and the average cookies per customer, in object properties.
function cookieStand(location, minCust, maxCust, avgCookiePerCustomer){
    return {
        location: location,
        min: minCust,
        max: maxCust,
        avgCookie: avgCookiePerCustomer

    }
}

// Use a method of that object to generate a random number of customers per hour. Objects/Math/random
function randomCustomer(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    randNum= Math.random() * (max - min + 1) + min;
    randNum = Math.floor(randNum);

    return 
}

// Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated.

let storeOpen = 6; // 6am
let storeClose = 20; // Using 24 hour clock
let hoursOpen = storeClose - storeOpen;
// console.log(hoursOpen);

// let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']; // hours stored in array
let cookiesSoldPerHour = [];
let cookiesSold = 0;
let totalCookiesSold = 0;

// for (i = 0; i < hours.length; i++){
//     let numOfCustomers = randomCustomer(seattle.min, seattle.max);
//     // console.log(numOfCustomers);
//     let cookiesSold = numOfCustomers * seattle.avgSale;
//     cookiesSold = Math.round(cookiesSold)
//     // console.log(cookiesSold);
//     cookiesSoldPerHour.push(cookiesSold);
//     console.log(cookiesSoldPerHour);

    
// }


function howMuchCookies(location){
    
    for (i = 0; i < hours.length; i++){
        let numOfCustomers = randomCustomer(location.min, location.max);
        console.log(location.min, location.max, numOfCustomers);
        let cookiesSold = numOfCustomers * location.avgSale;
        cookiesSold = Math.round(cookiesSold)
        cookiesSoldPerHour.push(cookiesSold);
        console.log(cookiesSoldPerHour);
        totalCookiesSold += cookiesSoldPerHour[i];
    }

    sumCookies(cookiesSoldPerHour);
    
    
}

console.log(sumCookies(seattle));




// Store the results for each location in a separate array… perhaps as a property of the object representing that location.

// get content container
let seattleShop = document.getElementById('seattleSales');

//create elements to be displayed
let seattleShopHeader = document.createElement('h2');
let seattleShopSales = document.createElement('ul');



//assign values from object
seattleShopHeader.textContent = seattle.location;

//append elements to container
seattleShop.appendChild(seattleShopHeader);

howMuchCookies(seattle);

 






let standOpen = 6;
let standClose = 20;
let hoursOpen = standClose - standOpen;
let stores = [];

//Global variables to get Table Elements to be used in render() method and related table functions.
let thead = document.getElementById('tableHeader');
let tbody = document.getElementById('tableBody');
let tfoot = document.getElementById('tableFooter');

function CookieLocation(standLocation, minCust, maxCust, avgSale) {
  this.location = standLocation;
  this.min = minCust;
  this.max = maxCust;
  this.avgSale = avgSale;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesSold = 0;
  stores.push(this);
}

// prototype method because connected to an object.
CookieLocation.prototype.randomCustomers = function(){
  let min = Math.ceil(this.min);
  let max = Math.floor(this.max);
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
};

CookieLocation.prototype.dailyCookiesSold = function(){
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesSold = 0;
  // for loop
  for (let i = 0; i <= hoursOpen; i++) {
    let customers = this.randomCustomers();
    this.customersPerHour.push(customers);
    let cookies = Math.round(customers * this.avgSale);
    this.cookiesPerHour.push(cookies);
    this.totalCookiesSold += cookies;
  } //end for loop
};

CookieLocation.prototype.render = function(){
  let dataRow = document.createElement('tr');
  // dataRow.innerHTML='';
  tbody.appendChild(dataRow);
  // dataRow.innerHTML = '';

  // create cells
  let tableData = document.createElement('td');
  tableData.textContent = this.location;
  dataRow.appendChild(tableData);

  let cookiesPerHour = this.cookiesPerHour;

  cookiesPerHour.forEach(cookie =>{

    // console.log(cookie);
    let tableDataCookies = document.createElement('td');
    tableDataCookies.textContent = cookie;

    dataRow.appendChild(tableDataCookies);
  });

  let totalCookiesSold = this.totalCookiesSold;
  let tableDataTotal = document.createElement('td');
  tableDataTotal.textContent = totalCookiesSold;
  // tableDataTotal.style='font-weight: 600; list-style:none; padding: 10px 0;';
  dataRow.appendChild(tableDataTotal);
};

function displayTableHeader(){

  // creates <tr> to hold each time cell
  let headerRow = document.createElement('tr');

  //add headerRow <tr> to the <thead>
  thead.appendChild(headerRow);

  //creates a blank <th> variable so i can put it before the times
  let blankTh = document.createElement('th');

  // add blank <th> to <tr>
  headerRow.appendChild(blankTh);

  // for loop that generates the time based on what time a location opens and what time it closes. If using an array, you would just set i = 0; i <= array.length and loop through your array.
  for (let i = standOpen; i <= standClose; i++) {
    // create <th>
    let thead = document.createElement('th');

    //give <th> a value
    if (i === 12) {
      thead.textContent = `${i}pm`;
    } else if (i > 12) {
      thead.textContent = `${i - 12}pm`;
    } else {
      thead.textContent = `${i}am`;
    }
    //add <th> to the <tr>
    headerRow.appendChild(thead);
  }
  // create a cell/column to store the totals
  let totalHeader = document.createElement('th');

  // give the header the Total Value
  totalHeader.textContent = 'Total';
  // adds the total column after all the times from the for-loop
  headerRow.appendChild(totalHeader);
}

function displayTableBody(){
  tbody.innerHTML='';
  
  for (let i = 0; i < stores.length; i++){
    let store = stores[i];
    store.dailyCookiesSold();
    store.render();
  }

}

function displayTableFooter(){
  tfoot.innerHTML ='';
  let footerRow = document.createElement('tr');
  tfoot.appendChild(footerRow);

  let totalFooter = document.createElement('td');
  totalFooter.textContent = 'Total';
  footerRow.appendChild(totalFooter);

  let grandTotal = 0;

  // while the hour is less than the hours open
  let h = 0;
  while (h <= hoursOpen){
    let hourlyTotal = 0; // resets the hourlyTotal to zero after each iteration
    for (let i = 0; i < stores.length; i++){
      console.log(stores.length);
      hourlyTotal += stores[i].cookiesPerHour[h]; //hourlyTotal starts at 0 because of code on line 143.
      grandTotal += stores[i].cookiesPerHour[h]; //keeps running total because we do not reset grandTotal = 0 anywhere in for or while loop.
    }
    let tableFooterTotal = document.createElement('td');
    tableFooterTotal.innerHTML='';
    tableFooterTotal.textContent = hourlyTotal;
    // tableFooterTotal.style='font-weight: 600; list-style:none; padding: 10px 0;';
    footerRow.appendChild(tableFooterTotal);

    h++;
  }

  let grandTotalFooter = document.createElement('td');
  grandTotalFooter.textContent = grandTotal;
  // grandTotalFooter.style='font-weight: 600; list-style:none; padding: 10px 0;';
  footerRow.appendChild(grandTotalFooter);
}


let addStandBtn = document.getElementById('addCookieStand');

addStandBtn.addEventListener('submit', function(event){
  event.preventDefault();
  // same as let stand = event.target.stand.value;
  // let min = event.target.min.value;
  // let max = event.target.max.value;
  // let value = event.target.value
  let {stand, min, max, avg} = event.target;
  stand = stand.value;
  min = parseInt(min.value);
  max = parseInt(max.value);
  avg = parseFloat(avg.value);

  new CookieLocation(stand, min, max, avg);
  console.log(stores);
  displayTableBody();
  displayTableFooter();
});

let seattle = new CookieLocation('Seattle', 23, 65, 6.3);
let tokyo = new CookieLocation('Tokyo', 3, 24, 1.2);
let dubai = new CookieLocation('Dubai', 11, 38, 3.7);
let paris = new CookieLocation('Paris',20,38,2.3);
let lima = new CookieLocation('Lima', 2, 16, 4.6);


// makes it easier to track totals for Testing Math stuffs
// let seattle = new CookieLocation('Seattle', 1, 1, 1);
// let tokyo = new CookieLocation('Tokyo', 1, 1, 1);
// let dubai = new CookieLocation('Dubai', 1, 1, 1);
// let paris = new CookieLocation('Paris', 1, 1, 1);
// let lima = new CookieLocation('Lima', 1, 1, 1);

displayTableHeader();
displayTableBody();
displayTableFooter();

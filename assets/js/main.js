function openUpStand(standLocation, minCust, maxCust, avgSale) {
  return {
    location: standLocation,
    min: minCust,
    max: maxCust,
    avgSale: avgSale,
    customersPerHour: [],
    cookiesPerHour: [],
    totalCookies: 0,

    // generate random number of cutomers based on value passed through parameters
    // Get random number between two numbers, inclusive
    randomCustomers: function() {
      let min = Math.ceil(this.min);
      let max = Math.floor(this.max);
      let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      return randomNum;
    },

    // calculate Daipan number of cookies sold
    dailyCookiesSold: function() {
      for (let i = 6; i <= 20; i++) {
        let customers = this.randomCustomers();
        this.customersPerHour.push(customers);
        let cookies = Math.round(customers * this.avgSale);
        this.cookiesPerHour.push(cookies);
        this.totalCookies += cookies;
      }
    }
  };
}

function appendHTML(sectionId, standLocation) {
  let shopSection = document.getElementById(sectionId);
  let shopName = document.createElement('h2');
  let shopUL = document.createElement('ul');

  shopName.textContent = `${standLocation.location}`;
  shopSection.appendChild(shopName);

  for (let i = 6; i <= 20; i++) {

    let shopLI = document.createElement('li');

    if (i === 12) {
      shopLI.textContent = `${i}pm : ${standLocation.cookiesPerHour[i - 6]} cookies`;
    } else if (i > 12) {
      shopLI.textContent = `${i - 12}pm: ${standLocation.cookiesPerHour[i - 6]} cookies`;
    } else {
      shopLI.textContent = `${i}am: ${standLocation.cookiesPerHour[i - 6]} cookies`;
    }

    shopUL.appendChild(shopLI);
  }
  let totalDailyCookies = document.createElement('li');
  totalDailyCookies.textContent = `Total: ${standLocation.totalCookies} cookies`;
  shopUL.appendChild(totalDailyCookies);
  shopSection.appendChild(shopUL);
}

let seattle = openUpStand('Seattle', 23, 65, 6.3);
seattle.dailyCookiesSold();
appendHTML('seattleSales', seattle);

let tokyo = openUpStand('Tokyo', 3, 24, 1.2);
tokyo.dailyCookiesSold();
appendHTML('tokyoSales', tokyo);

let dubai = openUpStand('Dubai', 11, 38, 3.7);
dubai.dailyCookiesSold();
appendHTML('dubaiSales', dubai);

let paris = openUpStand('Paris',20,38,2.3);
paris.dailyCookiesSold();
appendHTML('parisSales', paris);

let lima = openUpStand('Lima', 2, 16, 4.6);
lima.dailyCookiesSold();
appendHTML('lima', lima);


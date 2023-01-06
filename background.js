//service worker, can listen to events

chrome.runtime.onInstalled.addListener(() => {
  start_time = new Date();

  startTimer();
});





const productive_sites = ["*canvas.com", "*gmail.com"];
const unproductive_sites = ["*twitter.com"];
let prod_time = 0; //minutes
let unprod_time = 0; //minutes
let prev_date = null;
let curr_site = null;
let temp_site = null;
let start_time = null;
let end_time = null;
let time_spent = 0;

async function update() {
  let temp_site = await getTab();
  console.log(temp_site);
  if (curr_site != temp_site) {
    end_time = new Date();
    time_spent = timeCalculator(start_time, end_time);
    updateTime(time_spent, isProductiveSite(curr_site));
    curr_site = temp_site;
    start_time = end_time;
    console.log("unprod_time = " + unprod_time);
    console.log("prod_time = " + prod_time);

  }

}

//need to check if has url
function isProductiveSite(site) {
  let res = productive_sites.filter(item => item.match(site) != null);
  return res.length > 0;
}

function addSite(site, productive) {
  // match www something com
  if (!site.match("www.*com")) {
    return;
  }

  let domain = site.substring(site.indexOf("www") + 4, site.indexOf("com") + 3);
  if (productive) {
    productive_sites.push(domain);
  } else {
    unproductive_sites.push(domain);
  }
}

function removeSite(site, productive) {
  if (!site.match("www.*com")) {
    return;
  }

  if (productive) {
    productive_sites = productive_sites.filter(item => item.match(site) == null);
  } else {
    unproductive_sites = unproductive_sites.filter(item => item.match(site) == null);
  }
}

// console.log(productiveSite("canvas.com"));

function timeCalculator(in_time, out_time) {
  let start_time = in_time.getHours() * 60 + in_time.getMinutes() + in_time.getSeconds(); //change units later
  let end_time = out_time.getHours() * 60 + out_time.getMinutes() + out_time.getSeconds(); //change units later
  let time_spent = start_time - end_time; //time spent in minutes
  return time_spent;
}

function updateTime(time_spent, is_prod) {
  if (is_prod) {
    prod_time += time_spent;
  }
  else {
    unprod_time += time_spent;
  }
}


function promptTimeType() {

}

/*
if in prod_sites then add to prod_time
else if in unprod_sites then add to unprod time_
else prompt user if site is in prod/unprod

new Date();



*/

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     console.log("tab updated");
//     console.log(tabId);
//     console.log(changeInfo);
//     console.log(tab.url);
//     console.log(Date());

//     let new_date = Date();
//     if (!(prev_date == null)) {
//         console.log(timeCalculator(prev_date, new_date));
//     }
//     prev_date = new_date;
// });

// chrome.tabs.onCreated.addListener(function(tab) {         
//     console.log("new tab opened");
//     console.log(tab);
//     console.log(Date());

//     let new_date = Date();
//     if (!(prev_date == null)) {
//         console.log(timeCalculator(prev_date, new_date));
//     }
//     prev_date = new_date;
// });

// check current tab repeatedly
async function getTab() {
  let tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  let url = tabs[0].url;
  //console.log(tabs);
  //console.log(url);
  //console.log("unprod_time = " + unprod_time);
  // use `url` here inside the callback because it's asynchronous!
  return url;
}


function startTimer() {
  console.log("start timer");
  setInterval(update, 1000);
}
//function getTab() { console.log("timer timed") }
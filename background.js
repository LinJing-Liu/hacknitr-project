//service worker, can listen to events

chrome.runtime.onInstalled.addListener(() => {
  start_time = new Date();

  startTimer();
});

const productive_sites = ["canvas", "mail"];
const unproductive_sites = ["twitter.com"];
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
  if (temp_site == null) {
    return;
  }
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
  if (site == null) {
    return false;
  }
  let res = productive_sites.filter(item => site.match(item) != null);
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

function timeCalculator(in_time, out_time) {
  let sh = in_time.getHours();
  let sm = in_time.getMinutes();
  let ss = in_time.getSeconds();
  let eh = out_time.getHours();
  let em = out_time.getMinutes();
  let es = out_time.getSeconds();

  let diffh = eh - sh;
  let diffm = em - sm;
  let diffs = es - ss;
  let time_spent = diffh * 3600 + diffm * 60 + diffs
  return time_spent;
}

function updateTime(time_spent, is_prod) {
  if (is_prod) {
    prod_time += time_spent;
  }
  else {
    unprod_time += time_spent;
  }

  chrome.storage.local.set({ prodTime : prod_time }).then(() => {
    console.log("Prod time is set to: " + prod_time);
  });

  chrome.storage.local.set({ unprodTime : unprod_time }).then(() => {
    console.log("Unprod time is set to: " + unprod_time);
  });
}


function promptTimeType() {

}

/*
if in prod_sites then add to prod_time
else if in unprod_sites then add to unprod time_
else prompt user if site is in prod/unprod

new Date();



*/

// check current tab repeatedly
async function getTab() {
  let tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  
  if (tabs == null || tabs.length < 1) {
    return;
  }

  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  return url;
}

function startTimer() {
  console.log("start timer");
  setInterval(update, 1000);
}
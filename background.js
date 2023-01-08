//service worker, can listen to events

chrome.runtime.onInstalled.addListener(() => {
  start_time = new Date();
  startTimer();
});

var productive_sites = ["canvas.cornell.edu", "mail.google.com", "drive.google.com", "docs.google.com",
  "stackoverflow.com", "github.com", "leetcode.com", "w3schools.com"];
var unproductive_sites = ["twitter.com", "facebook.com", "reddit.com",
  "instagram.com", "netflix.com", "hulu.com", "hbomax.com", "disneyplus.com", "youtube.com", "google.com", "https://bonsaisushiny.com/"];
let prod_time = 0; //seconds
let unprod_time = 0; //seconds
let prev_date = null;
let curr_site = null;
let temp_site = null;
let start_time = null;
let end_time = null;
let time_spent = 0;
let prod_mult_factor = 1;
let unprod_mult_factor = 1;
let gen_event_target = new EventTarget();
const deficit_event = new Event("deficit");
var BUTTONTEXT = "Start";

chrome.storage.local.set({recordButtonText:BUTTONTEXT});
const prompt_event = new Event("prompt");
var lastPromptURL = null;

gen_event_target.addEventListener('deficit', async () => {
  console.log("deficit event triggered");
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "deficit greeting" });
  //console.log(response);
}, false);

gen_event_target.addEventListener('prompt', async () => {
  console.log("prompt event triggered");
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab.url == lastPromptURL) {
    return;
  } else {
    lastPromptURL = tab.url;
    const response = await chrome.tabs.sendMessage(tab.id, { greeting: "prompt greeting" });
    //console.log(response);
  }
}, false);

// setting the values initially
chrome.storage.local.set({ prodTime: prod_time })
chrome.storage.local.set({ unprodTime: unprod_time })
chrome.storage.local.set({ prodSites: productive_sites })
chrome.storage.local.set({ unprodSites: unproductive_sites })

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.prodSites != null) {
    productive_sites = changes.prodSites.newValue
  }

  if (changes.unprodSites != null) {
    unproductive_sites = changes.unprodSites.newValue
  }
})

async function update() {

  let temp_site = await getTab();
  if (temp_site == null) {
    return;
  }

  isProductiveSite(temp_site);
  if (curr_site != temp_site) {
    end_time = new Date();
    time_spent = timeCalculator(start_time, end_time);

    updateTime(time_spent, isProductiveSite(curr_site));
    curr_site = temp_site;
    start_time = end_time;
    deficit();
  }
}

function deficit() {
  if (points() <= 0) {
    gen_event_target.dispatchEvent(deficit_event);
  }
}

function points() {
  let points = prod_time * prod_mult_factor - unprod_time * unprod_mult_factor;
  return points;
}

// need to check if has url
function isProductiveSite(site) {
  if (site == null) {
    return null;
  }

  let prod_filter = productive_sites.filter(item => site.match(item) != null);
  let unprod_filter = unproductive_sites.filter(item => site.match(item) != null);
  if (prod_filter.length > 0) { return true; }
  else if (unprod_filter.length > 0) { return false; }
  else { return promptTimeType(); }//add more to handle null?
}

//checking unproductive
function isUnproductiveSite(site) {
  if (site == null) {
    return false;
  }
  let res = unproductive_sites.filter(item => site.match(item) != null);
  return res.length > 0;
}

function promptTimeType() { //promise?
  //open modal box (run html)
  gen_event_target.dispatchEvent(prompt_event);
  console.log("prompt event dispatched");

}

function addSite(site, productive) {
  // match www something com
  if (!site.match("www.*com")) {
    return;
  }

  let domain = site.substring(site.indexOf("www") + 4, site.indexOf("com") + 3);
  if (productive) {
    productive_sites.push(domain);
    chrome.storage.local.set({ prodSites: productive_sites }).then(() => {
      console.log("Prod sites is set to: " + productive_sites);
    });
  } else if (productive == false) {
    unproductive_sites.push(domain);
    chrome.storage.local.set({ unprodSites: unproductive_sites }).then(() => {
      console.log("Prod sites is set to: " + unproductive_sites);
    });
  }
}

function removeSite(site, productive) {
  if (!site.match("www.*com")) {
    return;
  }

  if (productive) {
    productive_sites = productive_sites.filter(item => item.match(site) == null);
    chrome.storage.local.set({ prodSites: productive_sites }).then(() => {
      console.log("Prod sites is set to: " + productive_sites);
    });
  } else {
    unproductive_sites = unproductive_sites.filter(item => item.match(site) == null);
    chrome.storage.local.set({ unprodSites: unproductive_sites }).then(() => {
      console.log("Prod sites is set to: " + unproductive_sites);
    });
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

  if (is_prod == null) {
  }

  else if (is_prod) {
    prod_time += time_spent;
  }
  else if (!is_prod) {
    unprod_time += time_spent;
  }


  chrome.storage.local.set({ prodTime: prod_time }).then(() => {
    console.log("Prod time is set to: " + prod_time);
  });

  chrome.storage.local.set({ unprodTime: unprod_time }).then(() => {
    console.log("Unprod time is set to: " + unprod_time);
  });
}

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


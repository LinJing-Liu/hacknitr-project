console.log("popup script");   

chrome.storage.local.get("prodTime").then((result) => {
    var prodTime = result.prodTime;
    if (prodTime == null) {
        prodTime = 0;
    }
    console.log("Value currently is " + prodTime);
    document.getElementById("prod-time").innerHTML = prodTime;
});

chrome.storage.local.get("unprodTime").then((result) => {
    var unprodTime = result.unprodTime;
    if (unprodTime == null) {
        unprodTime = 0;
    }
    console.log("Value currently is " + unprodTime);
    document.getElementById("unprod-time").innerHTML = unprodTime;
});
console.log("popup script");   
const siteElementId = ["prodSiteLabel", "prodSiteList", "unprodSiteLabel", "unprodSiteList"];

chrome.storage.local.get("prodTime").then((result) => {
    var prodTime = result.prodTime;
    if (prodTime == null) {
        prodTime = 0;
    }
    console.log("prodTime currently is " + prodTime);
    document.getElementById("prod-time").innerHTML = prodTime;
});

chrome.storage.local.get("unprodTime").then((result) => {
    var unprodTime = result.unprodTime;
    if (unprodTime == null) {
        unprodTime = 0;
    }
    console.log("unprodTime currently is " + unprodTime);
    document.getElementById("unprod-time").innerHTML = unprodTime;
});

function getSiteContent(sites, productive) {
    let note = productive ? "p" : "up"
    var listContent = "";
    var id = 0;
    for (var link of sites) {
        var deleteIcon = "<img src=\"images/trash.png\" class=\"trashImg\" id=\"trash-" + note + id + "\" />"
        listContent += "<li> <a href=https://" + link + " target=\"_blank\" >" + link + "</a>" + deleteIcon + "</li>";
        id ++;
    }
    return listContent;
}

chrome.storage.local.get("prodSites").then((result) => {
    var prodSites = result.prodSites;
    console.log("prodSites currently is " + prodSites);

    if (prodSites.length == 0) {
        return;
    }

    document.getElementById("prodSiteLabel").innerHTML = "Productive Sites";
    document.getElementById("prodSiteList").innerHTML = getSiteContent(prodSites, true);

    for(var i = 0; i < prodSites.length; i ++) {
        var trashImg = document.getElementById("trash-p" + i);

        if (!(trashImg == null)) {
            trashImg.addEventListener('click', function(event) {
                let id = event.target.id;
                id = id.substring(id.indexOf("p") + 1);
                chrome.storage.local.get("prodSites").then(() => {
                    var updatedProdSites = result.prodSites;
                    var head = updatedProdSites.splice(0, id);
                    updatedProdSites.splice(0, 1);
                    updatedProdSites = head.concat(updatedProdSites);

                    chrome.storage.local.set({ prodSites : updatedProdSites }).then(() => {
                        console.log("Prod sites is set to: " + updatedProdSites);
                    });
                });
            });
        }
    }
});

chrome.storage.local.get("unprodSites").then((result) => {
    var unprodSites = result.unprodSites;
    console.log("unprodSites currently is " + unprodSites);

    if (unprodSites.length == 0) {
        return;
    }

    document.getElementById("unprodSiteLabel").innerHTML = "Unproductive Sites";
    document.getElementById("unprodSiteList").innerHTML = getSiteContent(unprodSites, false);

    for(var i = 0; i < unprodSites.length; i ++) {
        var trashImg = document.getElementById("trash-up" + i);

        if (!(trashImg == null)) {
            trashImg.addEventListener('click', function(event) {
                let id = event.target.id;
                id = id.substring(id.indexOf("up") + 2);
                chrome.storage.local.get("unprodSites").then(() => {
                    var updatedUnprodSites = result.unprodSites;
                    var head = updatedUnprodSites.splice(0, id);
                    updatedUnprodSites.splice(0, 1);
                    updatedUnprodSites = head.concat(updatedUnprodSites);

                    console.log(head);
                    console.log(id);
                    console.log(updatedUnprodSites);
                    chrome.storage.local.set({ unprodSites : updatedUnprodSites }).then(() => {
                        console.log("Unprod sites is set to: " + updatedUnprodSites);
                    });
                });
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var recordButton = document.getElementById("recordButton");
    var recordButtonText = document.getElementById("recordButtonText");
    recordButton.addEventListener('click', function() {
        if (recordButtonText.innerHTML.toLowerCase() == "start") {
            recordButtonText.innerHTML = "Stop";
        } else {
            recordButtonText.innerHTML = "Start";
        }
    });

    var detailButton = document.getElementById("detailButton");
    var detailButtonText = document.getElementById("detailButtonText");
    var siteElements = [];
    for (var item of siteElementId) {
        siteElements.push(document.getElementById(item));
    }
    detailButton.addEventListener('click', function() {
        console.log(detailButtonText.innerHTML.toLowerCase());
        if (detailButtonText.innerHTML.toLowerCase() == "show") {
            detailButtonText.innerHTML = "Hide";
            for(var ele of siteElements) {
                ele.style.display = "block";
            }
        } else {
            detailButtonText.innerHTML = "Show";
            for(var ele of siteElements) {
                ele.style.display = "none";
            }
        }
    });
});
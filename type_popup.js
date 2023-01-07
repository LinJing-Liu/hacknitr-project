console.log("popup script");   
const siteElementId = ["prodSiteLabel", "prodSiteList", "unprodSiteLabel", "unprodSiteList"];

chrome.storage.local.get("prodTime").then((result) => {
    var prodTime = result.prodTime;
    if (prodTime == null) {
        prodTime = 0;
    }
    console.log("prodTime currently is " + prodTime);
    document.getElementById("prod-time").innerHTML = prodTime;
    //convert productive time into money and add to the piggy bank 60sec=$1
    if (prodTime!=0){ 
        //make productive time into float with 2 places after decimal   
        var money = (prodTime / 60).toFixed(2) ;
        var new_money= "$" + money
        document.getElementById("amtofmoney").innerHTML= new_money;
    }
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
        listContent += "<li class=\"list-group-item\"> <a href=https://" + link + " target=\"_blank\" >" + link + "</a>" + deleteIcon + "</li>";
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

document.getElementById("addSiteSection").style.display = "none";

// tempData saved for adding sites
var siteDomain = "";
var siteProductive = false;

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

    for(var ele of siteElements) {
        ele.style.display = "none";
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
    
    var addSiteButton = document.getElementById("addSiteButton");
    var addSection = document.getElementById("addSiteSection");
    addSiteButton.addEventListener('click', function() {
        addSiteButton.style.display = "none";
        addSection.style.display = "block";
    });

    var addSiteDomain = document.getElementById("addSiteDomain");
    addSiteDomain.addEventListener('input', function(event) {
        siteDomain = event.target.value;
    });

    var addProdSelection = document.getElementById("addProductiveSelection");
    addProdSelection.addEventListener('input', function() {
        siteProductive = addProdSelection.checked;
    });

    var addSubmitButton = document.getElementById("addSubmitButton");
    addSubmitButton.addEventListener('click', function() {
        addSection.style.display = "none";
        addSiteButton.style.display = "inline";
        
        if (!siteDomain.match(".*\..*")) {
            alert("Invalid domain name for the added site. The domain name must have the format of domain name with corresponding ending, such as instagram.com");
            return;
        }

        if (siteProductive) {
            chrome.storage.local.get("prodSites").then((result) => {
                var sites = result.prodSites;
                sites.push(siteDomain);

                chrome.storage.local.set({ prodSites : sites }).then(() => {
                    console.log("Prod sites is set to: " + sites);
                });
            });
        } else {
            chrome.storage.local.get("unprodSites").then((result) => {
                var sites = result.unprodSites;
                sites.push(siteDomain);

                chrome.storage.local.set({ unprodSites : sites }).then(() => {
                    console.log("Unprod sites is set to: " + sites);
                });
            });
        }
    });

    var addCancelButton = document.getElementById("addCancelButton");
    addCancelButton.addEventListener('click', function() {
        siteDomain = "";
        siteProductive = false;
        addSiteDomain.value = "";
        addProdSelection.checked = false;
        addSection.style.display = "none";
        addSiteButton.style.display = "inline";
    });

    var reportButton = document.getElementById("reportButton");
    reportButton.addEventListener('click', function() {
        window.open("container.html", '_blank').focus();
    });
});
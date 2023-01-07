

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log("AHHHHHH")
  if (response.greeting == 'start') {
    console.log("deficit event triggered in content.js");
    alert("Deficit event");
  }
});


console.log("page has content!")
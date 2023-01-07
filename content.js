chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log("AHHHHHH")
  if (response.greeting == 'start') {
    console.log("deficit event triggered in content.js");
    alert("Friendly Reminder: Your unproductive time has exceeded your productive time. Get back to work!")
  }
});

console.log("page has content!")

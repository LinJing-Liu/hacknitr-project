var options = {
  type: "basic",
  title: "friendly reminder: get back to work!",
  message: "your unproductive time has exceeded your productive time.",
  iconUrl: "images/reg_icon.png"
};


chrome.notifications.create(options, callback);

function callback() {
  console.log('Popup done!')
}
//accessing the total money value 
var curr_money = type_popup.js.amt_of_money;
//myFunction(){
//curr_money = curr_money - 10;
//}
button1.addEventListener("click", myFunction());
// dealing with the first button 
//var x = document.getElementById("b1");


document.addEventListener('DOMContentLoaded', function () {
  var recordButton_local = document.getElementById("recordButton");
  /*var recordButtonText_local = document.getElementById("recordButtonText");*/
  chrome.storage.local.get("recordButtonText").then((result) => {
    var recordButtonTextt = result.recordButtonText;
    recordButton_local.addEventListener('click', function () {

      if (recordButtonTextt == "Feed Mr.BaconStrip! (-$10)") {
        //";document.getElementById("recordButtonText").innerHTML = "Stop;
        //recordButtonTextt = "Stop";
        curr_money = curr_money - 10;
        chrome.storage.local.set({ recordButtonText: recordButtonTextt }).then(() => {
          console.log("reduced money by $10");
        });

      } else if (recordButtonTextt == "Get Mr.Baconstrip a light saber! (-$50)") {
        //document.getElementById("recordButtonText").innerHTML = "Start";
        //recordButtonTextt = "Start";
        curr_money = curr_money - 50;
        chrome.storage.local.set({ recordButtonText: recordButtonTextt }).then(() => {
          console.log("reduced money by $50");
        });
      }
    });
  });

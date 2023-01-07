chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log("AHHHHHH")
  if (response.greeting == "deficit greeting") {
    console.log("deficit event triggered in content.js");
    alert("Friendly Reminder: Your unproductive time has exceeded your productive time. Get back to work!")
  }
  else if (response.greeting == "prompt greeting") {
    console.log("prompt event triggered in content.js");
    console.log(document);
    console.log("doc height should be printed ^");
    //add popup here
    //document.body.onload = addElement;
    document.body.appendChild(addElement());

    //document.body.appendChild(logger);

  }
});





console.log("page has content!")


function addElement() {
  // create a new div element
  console.log("!!!!!!!!!!!!!!!!!!!!!!!addElement is Executed");
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");
  //newContent.style.position = "absolute";
  //newContent.style.top = "10";
  // add the text node to the newly created div
  newDiv.appendChild(newContent);
  console.log("last line executed");
  return newDiv;
  //document.append("testing append")
  // add the newly created element and its content into the DOM
  //const currentDiv = document.getElementById("div1");

  //document.body.insertBefore(newDiv, currentDiv);
}

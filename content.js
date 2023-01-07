chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log("AHHHHHH")
  if (response.greeting == "deficit greeting") {
    console.log("deficit event triggered in content.js");
    alert("Friendly Reminder: Your unproductive time has exceeded your productive time. Get back to work!")
  }
  if (response.greeting == "prompt greeting") { //changed from prompt greeting
    console.log("prompt event triggered in content.js");
    console.log(document);
    console.log("doc height should be printed ^");
    //add popup here
    //document.body.onload = addElement;
    //document.body.appendChild(addElement()); !!!!!!!!!!!!!!!!

    //document.body.appendChild(logger);

    var x = document.createElement("div");
    x.innerHTML = `
    <div>
    <title>Title of the document</title>
    <style>
      .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
      }
  
      .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #eeeeee;
        padding: 1rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
      }
  
      .close-button {
        float: right;
        width: 1rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 30px;
        background-color: #eeeeee;
      }
  
      .close-button:hover {
        background-color: #adadad;
      }
  
      .show-modal {
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
      }
    </style>
    </div>
    <div>

<div>
  <button class="example">Click here to see the modal!</button>
  <div class="modal">
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>Is this sight productive?</h2>
      <button class="yes_prod">Yes</button>
      <button class="no_prod">No</button>
    </div>
  </div>
  
  <div>
  <script>
  let modal = document.querySelector(".modal");
  let trigger = document.querySelector(".example");
  let closeButton = document.querySelector(".close-button");
  let yesButton = document.querySelector(".yes_prod");
  let noButton = document.querySelector(".no_prod");

  function toggleModal() {
    modal.classList.toggle("show-modal");
  }
  function yesButtonFun() {
    toggleModal();
    addSite(getTab(), true);

  }
  function noButtonFun() {
    toggleModal();
    addSite(getTab(), false);

  }
  function windowOnClick(event) {
    if (event.target === modal) {
      toggleModal();
    }
  }
  trigger.addEventListener("click", toggleModal);

  yesButton.addEventListener("click", yesButtonFun);

  noButton.addEventListener("click", noButtonFun);


  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);
</script>
  </div>
</div>
</div>
    `;
    document.body.prepend(x);
    //document.body.append(document.createElement("<include src=\"./modal.html\"></include>"));

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

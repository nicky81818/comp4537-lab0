let arrayButtons = [];
const WINDOW_HEIGHT = window.innerHeight
const WINDOW_WIDTH = window.innerWidth
console.log(WINDOW_HEIGHT, WINDOW_WIDTH)

function Button(color, width, height, top, left, order) {
  this.order = order;
  this.btn = document.createElement("button");
  this.btn.style.backgroundColor = color;
  this.btn.style.width = width;
  this.btn.style.height = height;
  this.btn.style.position = "absolute"
  this.btn.innerText = order;
  this.btn.disabled = true;
  this.btn.setAttribute("id", order);
  this.btn.onclick = function () {
    document.getElementById(this.id).innerText = this.id;
    console.log("clicked")
    console.log(this)
  };
  document.getElementById("buttons").appendChild(this.btn);

  this.setLocation = function (top, left) {
    if (top > WINDOW_HEIGHT) {
      console.log(this.btn.style.height)
      this.btn.style.top = top % WINDOW_HEIGHT - this.btn.style.height;
      
    } else {
      this.btn.style.top = top;
    }
    if (left > WINDOW_WIDTH) {
      this.btn.style.left = left % WINDOW_WIDTH - this.btn.style.width;

    } else {
      this.btn.style.left = left;
    }
    
  };

  this.setLocation(top, left);

  this.activateButton = function() {
    this.btn.disabled = false;
    this.btn.innerText = "";
  };

  this.reveal = function() {
    this.btn.innerText = this.order;
  }
}

// arrayButtons.push(new Button("Red", "100px", "100px", "0px","0px", 0));
// arrayButtons.push(new Button("Red", "200px", "100px", "200px", "200px", 1));

// const move = function() {setInterval(function() {
//   arrayButtons[0].setLocation(
//     Math.floor(Math.random() * 100) + "px",
//     Math.floor(Math.random() * 100) + "px"
//   );
// }, 2000)}

function generateButtons() {
  let total = parseInt(document.getElementById("user-input").value);
  console.log("hi" + total);
  let x = 100;
  let y = 100;
  for (let index = 0; index < total; index++) {
    arrayButtons.push(new Button(generateRandomColour(), "10em", "5em", x + "px", y + "px", index));
    // x += 200;
    y += 200;
    
  }
  startGame(total);
  
}

function generateRandomColour(){
  let colour = Math.floor(Math.random() * 16777216).toString(16);
  return "#"+colour;
}

function startGame(total){
  setTimeout(function () {
    console.log("time to move");
    let id = setInterval(function() {
      // console.log(arrayButtons)
      arrayButtons.forEach(function(button) {
        console.log(button.order)
        button.setLocation(
          Math.floor(Math.random() * 1000) + "px",
          Math.floor(Math.random() * 1000) + "px"
        );
        // console.log(button.style.top)
      })
    }, 2000)
    setTimeout(function () {
      clearInterval(id);
      console.log("stopped")
      arrayButtons.forEach(function(button) {
        button.activateButton();
      })
    }, 2000*total);
  }, total * 1000);
}
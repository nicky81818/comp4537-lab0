let arrayButtons = [];
let total;
let windowWidth;
let windowHeight;

class Button {
  static counter = 0;

  constructor(width, height, top, left, order){
    this.order = order;

    this.btn = document.createElement("button");
    this.btn.style.backgroundColor = this.generateRandomColour();
    this.btn.style.width = width;
    this.btn.style.height = height;
    this.btn.style.flexShrink = 0;

    this.btn.innerText = order;
    this.btn.disabled = true;
    this.btn.setAttribute("id", order);
    this.btn.setAttribute("class", "game-btn");
    this.btn.onclick = function () {
      if (Button.counter !== order) {
        let message = document.createElement("p");
        message.innerText = STRINGS["MESSAGES"]["ERROR"];
        document.getElementById("message").appendChild(message);
        arrayButtons.forEach(function(button) {
          button.reveal();
        })
      } else {
        document.getElementById(this.id).innerText = this.id;
        Button.counter++;
        if (parseInt(total) === Button.counter) {
          let message = document.createElement("p");
          message.innerText = STRINGS["MESSAGES"]["SUCCESS"];
          document.getElementById("message").appendChild(message);
        }
      }
    };
    document.getElementById("buttons").appendChild(this.btn);
    this.setLocation(top, left);
  }

  setLocation (top, left) {
    this.btn.style.top = top;
    this.btn.style.left = left;
  };

  generateRandomColour(){
    let colour = Math.floor(Math.random() * 16777216).toString(16);
    return "#"+colour;
  }

  activateButton() {
    this.btn.disabled = false;
    this.btn.innerText = "";
  };

  reveal() {
    this.btn.innerText = this.order;
  }

  static resetCounter() {
    Button.counter = 0;
  }
}

class Game{
  static generateGame(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    total = document.getElementById("user-input").value;
    if (Game.validateUserInput(total)) {
      Game.resetGame()
      for (let index = 0; index < total; index++) {
        arrayButtons.push(new Button("10em", "5em", "0px","0px", index));
      }
      Game.startGame(total);
    } else {
      let message = document.createElement("p");
      message.innerText = STRINGS["VALIDATION"]["NUMBER"];
      document.getElementById("message").appendChild(message);
    }

  }
  static validateUserInput(input) {
    let number = parseInt(input);
    return number >= 3 && number <= 7;
  }

  static generateRandomPosition(max, border) {
    return Math.floor(Math.random() * (max - border));
  }
  
  static startGame(total){
    setTimeout(function () {
      let intervalId = setInterval(function() {
        arrayButtons.forEach(function(button) {
          button.btn.style.position = "absolute";
          button.setLocation(
            Game.generateRandomPosition(windowHeight, button.btn.offsetHeight) + "px",
            Game.generateRandomPosition(windowWidth, button.btn.offsetWidth) + "px"
          );
        })
      }, 2000)
      setTimeout(function () {
        clearInterval(intervalId);
        arrayButtons.forEach(function(button) {
          button.activateButton();
        })
      }, 2000*total);
    }, total * 1000);
  }

  static resetGame() {
    arrayButtons.forEach(function(button) {
      button.btn.remove();
    })
    arrayButtons = []
    document.getElementById("message").textContent = ""
    Button.resetCounter();
  }
}
  
class App{
  main() {
    this.applyTranslations();
    document.getElementById("go-btn").onclick = () => {
      Game.generateGame()
    }
  }

  applyTranslations(){
    document.getElementById("question").textContent = STRINGS["QUESTION"];
    document.getElementById("go-btn").textContent = STRINGS["GO-BTN"];
  }
}

let app = new App();
app.main();

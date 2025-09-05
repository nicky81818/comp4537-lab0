let arrayButtons = [];
let total;
const WINDOW_HEIGHT = window.innerHeight
const WINDOW_WIDTH = window.innerWidth
console.log(WINDOW_HEIGHT, WINDOW_WIDTH)


class Button {
  static counter = 0;

  constructor(width, height, top, left, order){
    this.order = order;
    this.btn = document.createElement("button");
    this.btn.style.backgroundColor = this.generateRandomColour();
    this.btn.style.width = width;
    this.btn.style.height = height;
    this.btn.style.position = "absolute"
    this.btn.innerText = order;
    this.btn.disabled = true;
    this.btn.setAttribute("id", order);
    this.btn.onclick = function () {
      console.log(Button.counter);
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
        console.log("clicked")
        if (total === Button.counter) {
          let message = document.createElement("p");
          message.innerText = STRINGS["MESSAGES"]["SUCCESS"];
          document.getElementById("message").appendChild(message);
        }
      }
      // console.log(this)
    };
    document.getElementById("buttons").appendChild(this.btn);
    this.setLocation(top, left);
  }

  setLocation (top, left) {
    // todo fix buttons leaving the screen
    if (top > WINDOW_HEIGHT) {
      console.log(this.btn.style.height)
      this.btn.style.top = top % (WINDOW_HEIGHT - this.btn.style.height);
      
    } else {
      this.btn.style.top = top;
    }
    if (left > WINDOW_WIDTH) {
      this.btn.style.left = left % (WINDOW_WIDTH - this.btn.style.width);

    } else {
      this.btn.style.left = left;
    }
    
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
}
// todo put game related functions in here
class Game{
  constructor(){
    
  }
  
  static generateGame(){
    total = document.getElementById("user-input").value;
    if (Game.validateUserInput(total)) {
  
      console.log("hi" + total);
      let x = 100;
      let y = 100;
      Game.resetGame()
      for (let index = 0; index < total; index++) {
        arrayButtons.push(new Button("10em", "5em", x + "px", y + "px", index));
        // x += 200;
        y += 200;
        
      }
      Game.startGame(total);
    } else {
      let message = document.createElement("p");
      message.innerText = STRINGS["VALIDATION"]["NUMBER"];
      document.getElementById("message").appendChild(message);
    }

  }
  static validateUserInput(input) {
    // todo validate 3-7 buttons
    let number = parseInt(input);
    return number <= 7 && number >= 3;

  }
  
  static startGame(total){
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

  static resetGame() {
    arrayButtons.forEach(function(button) {
      button.btn.remove();
    })
    arrayButtons = []
    document.getElementById("message").textContent = ""
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

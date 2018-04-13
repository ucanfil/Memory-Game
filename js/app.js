// List created holding all cards
const cardsArray = [
  'fa-diamond',
  'fa-diamond',
  'fa-bolt',
  'fa-bolt',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb',
];
let clicks = 0;
let moves = 0;
let movesDisplay = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsDisplay = 3;
const deck = document.getElementsByClassName("deck");
const cards = deck[0].children;
let openCardsArray = [];
let matchedCardsArray = [];
let restartButton = document.querySelector(".restart");
let totalSeconds = 0;
movesDisplay.textContent = 0;
createTimerDiv();
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// Stars rating function
function starsRating() {
  if (clicks % 20 === 0 && starsDisplay !== 0) {
    stars[starsDisplay - 1].classList.remove("fa-star");
    stars[starsDisplay - 1].classList.add("fa-star-o");
    starsDisplay -= 1;
    return starsDisplay === 0 ? callModal() : "";
  }
}


// Shuffling cardsArray with the function has given
shuffle(cardsArray);
assignCards();

// Assigning shuffled cardsArray to its HTML
function assignCards() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].children[0].classList = "";
    cards[i].children[0].classList.add("fa");
    cards[i].children[0].classList.add(cardsArray[i]);
  }
}

// setTime function binded to a click event on deck item
deck[0].addEventListener("click", function() {
  setInterval(setTime, 1000);
}, {once: true});


// Setting up decks' eventListener
deck[0].addEventListener("click", eventListenerFunction);

// all functions that we'd like to run if click events occurs
function eventListenerFunction(event) {
  openCardsArray.length === 2 ? deck[0].removeEventListener("click", eventListenerFunction)
   : deck[0].addEventListener("click", eventListenerFunction);
  if (openCardsArray.length < 2 && event.target.nodeName === "LI"
   && !event.target.classList.contains("open", "show")) {
    clicks++; // Counting clicks
    moves = Math.floor(clicks / 2); //Counting moves
    movesDisplay.textContent = moves; //Changing moves display
    starsRating();
    openPushCard(event);
    isMatched(event);
  }
}

// function displays cards symbol - adding card to openCardsArray
function openPushCard(event) {
  event.target.classList.add("open", "show");
  openCardsArray.push(event.target);
}

// is cards in the openCards array matched?
function isMatched(event) {
  if (openCardsArray.length === 2) {
    if (openCardsArray[0].children[0].classList[1] !== openCardsArray[1].children[0].classList[1]
      && !event.target.classList.contains("unmatch")) {
      openCardsArray.forEach(unmatch);
      openCardsArray = [];
    } else if (openCardsArray[0].children[0].classList[1] === openCardsArray[1].children[0].classList[1]
      && !event.target.classList.contains("match")) {
      openCardsArray.forEach(match);
      matchedCardsArray.push(...openCardsArray);
      openCardsArray = [];
      gameOver();
    }
  }
}

// adding unmatch class function
function unmatch(item) {
  item.classList.add("unmatch");
  setTimeout(() => item.classList.remove("unmatch", "open", "show"), 500);
}

// adding match class function
function match(item) {
  item.classList.add("match");
}

//  if all cards matched run gameOver function into isMatched function
function gameOver() {
  if (matchedCardsArray.length >= 16) {
    callModal();
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 // Restart function
const restart = function() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open", "show", "match");
  }
  matchedCardsArray = [];
  openCardsArray = [];
  totalSeconds = 0; //reseting countup timer
  clicks = 0;
  moves = 0;
  movesDisplay.textContent = 0;
  fillingStars();
  shuffle(cardsArray);
  assignCards();
}

// filling up starsDisplay again
function fillingStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("fa-star-o");
    stars[i].classList.add("fa-star");
  }
  starsDisplay = 3;
}

// Click event that runs restart function
restartButton.addEventListener("click", restart);

// Adding a timer to the document dynamically
function createTimerDiv() {
  let restartButton = document.querySelector(".restart");
  let scorePanel = document.querySelector(".score-panel");
  let timer = document.createElement("div");
  timer.setAttribute("id", "timer");
  timer.innerHTML = "<span id='minutes'>00</span>:<span id='seconds'>00</span>";
  scorePanel.insertBefore(timer, restartButton);
}

// Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript/7910506
function setTime() {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  const valString = val + "";
  return valString.length < 2 ? "0" + valString : valString;
}

// Creating a modal dynamically
const callModal = function (){
  const fragment = document.createDocumentFragment();
  const modal = document.createElement("div");
  const h2 = document.createElement("h2");
  const h4 = document.createElement("h4");
  const playAgainButton = document.createElement("button");
  modal.setAttribute("id", "modal");
  h2.setAttribute("id", "modal-h2");
  h4.setAttribute("id", "modal-h4");
  playAgainButton.setAttribute("id", "playAgainButton");
  h2.textContent = stars.Display !== 0 && matchedCardsArray.length === 16 ? "Congratulations, you won the game!" : "You ran out of stars, you lose the game :(";
  h4.textContent = `In ${minutes.textContent} minutes, ${seconds.textContent} seconds with ${movesDisplay.textContent}
  moves and ${starsDisplay} stars`;
  playAgainButton.textContent = "Play Again?";
  modal.appendChild(h2);
  modal.appendChild(h4);
  modal.appendChild(playAgainButton);
  fragment.appendChild(modal);
  document.body.appendChild(fragment);

// Modal -- playAgainButton Event Listener
playAgainButton.addEventListener("click", function () {
  modal.remove();
  restart();
});
};
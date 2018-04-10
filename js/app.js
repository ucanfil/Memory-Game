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

createTimerDiv();

// Shuffling cardsArray with the function has given
shuffle(cardsArray);

// Assigning shuffled cardsArray to its HTML
const deck = document.getElementsByClassName("deck");
const cards = deck[0].children;

// setTime function binded to a click event on deck item
const x = () => setInterval(setTime, 1000);
deck[0].addEventListener("click", x, {once: true});

for (let i = 0; i < cards.length; i++) {
  cards[i].children[0].classList.add(cardsArray[i]);
}

// Setting up decks' eventListener
let openCardsArray = [];
let matchedCardsArray = [];

deck[0].addEventListener("click", eventListenerFunction);

// all functions that we'd like to run if click events occurs
function eventListenerFunction(event) {
  if (openCardsArray.length < 2 && event.target.nodeName === "LI") {
    openCard(event);
    pushToOpenCardsArray(event);
    isMatched();
  }
}

// function displays cards symbol - openCard
function openCard(event) {
  event.target.classList.add("open", "show");
}

// adding card to openCardsArray
function pushToOpenCardsArray(event) {
  openCardsArray.push(event.target);
}




// is cards in the openCards array matched?
function isMatched() {
  if (openCardsArray.length === 2) {
    if (openCardsArray[0].children[0].classList[1] !== openCardsArray[1].children[0].classList[1]) {
      openCardsArray.forEach(unmatch);
      openCardsArray = [];
    } else if (openCardsArray[0].children[0].classList[1] === openCardsArray[1].children[0].classList[1]) {
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
  setTimeout(() => item.classList.remove("unmatch"), 500);
  setTimeout(() => item.classList.remove("open", "show"), 500);
}

// adding match class function
function match(item) {
  item.classList.add("match");
}

//  if all cards matched run gameOver function into isMatched function

function gameOver() {
  if (matchedCardsArray.length >= 16) {
    totalSeconds = 0;
    callModal();
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // Restart function
const restart = function() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open", "show", "match");
  }
  matchedCardsArray = [];
  openCardsArray = [];
  totalSeconds = 0; //reseting countup timer
  shuffle(cardsArray);
}

// Selecting restart icon and adding a click event that runs restart function
let restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart);

// Adding a timer to the document dynamically
function createTimerDiv() {
  let restartButton = document.querySelector(".restart");
  let scorePanel = document.querySelector(".score-panel");
  let timer = document.createElement("div");
  timer.innerHTML = "<span id='minutes'>00</span>:<span id='seconds'>00</span>";
  scorePanel.insertBefore(timer, restartButton);
  timer.style.marginLeft = "150px";
  timer.style.display = "inline-block";
}

// Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript/7910506
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let totalSeconds = 0;

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
  h2.textContent = "Congratulations, you won the game!";
  let stars = 3;
  let moves = 8;
  h4.textContent = `In just ${minutes.textContent} minutes, ${seconds.textContent} seconds with ${moves} moves and ${stars} stars`;
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
}


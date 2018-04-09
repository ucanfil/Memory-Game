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

// Shuffling cardsArray with the function has given
shuffle(cardsArray);

// Assigning shuffled cardsArray to its HTML
const deck = document.getElementsByClassName("deck");
const cards = deck[0].children;

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
  return matchedCardsArray.length === 16 ? console.log("Game Over") : "";
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
function restart() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open", "show", "match");
  }
  // countUp timer function will get in here !!!
  shuffle(cardsArray);
}

// Selecting restart icon and adding a click event that runs restart function
let restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart);
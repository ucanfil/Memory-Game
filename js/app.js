/*
 * Create a list that holds all of your cards
 */
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
const cardsContainer = document.getElementsByClassName("card");

for (let i = 0; i < cardsContainer.length; i++) {
  cardsContainer[i].children[0].classList.add(cardsArray[i]);
}

// Setting up cardsContainer eventListener
let openCards = [];
let matchedCards = [];

for (let i = 0; i < cardsContainer.length; i++) {
  cardsContainer[i].addEventListener("click", function() {
    this.classList.add("open", "show");
    openCards.push(this);
    setTimeout(isMatched, 1000);
  });
}

// is cards in the openCards array matched?

function isMatched() {
  if (openCards.length > 1) {
    if (openCards[0].children[0].classList[1] !== openCards[1].children[0].classList[1]) {
      openCards[0].classList.remove("open", "show");
      openCards[1].classList.remove("open", "show");
      openCards = [];
    } else {
      matchedCards.push(openCards);
      openCards = [];
      gameOver();
    }
  }
}

//  if all cards matched run gameOver function into isMatched function

function gameOver() {
  return matchedCards.length === 8 ? console.log("Game Over") : "";
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

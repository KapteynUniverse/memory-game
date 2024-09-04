const title = document.getElementById("title");
const cards = document.querySelectorAll(".memory-card");
cards.forEach((card) => card.addEventListener("click", flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const className = "flip";

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add(className);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  lockBoard = true;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
  checkWin();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  title.innerHTML = "Nice!";

  resetBoard();
}

function unflipCards() {
  title.innerHTML = "Try Again";
  setTimeout(() => {
    firstCard.classList.remove(className);
    secondCard.classList.remove(className);
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard, firstCard, secondCard] = [
    false,
    false,
    null,
    null,
  ];
}

function checkWin() {
  const allHaveClass = Array.from(cards).every((card) =>
    card.classList.contains(className)
  );

  if (allHaveClass) {
    title.innerHTML = "You won! Restarting the game...";
    setTimeout(() => {
      title.innerHTML = "Memory Game";
      restartGame();
    }, 1000);
  }
}

function restartGame() {
  cards.forEach((card) => {
    card.classList.remove(className);
  });

  cards.forEach((card) => card.addEventListener("click", flipCard));
  shuffle();
  resetBoard();
}

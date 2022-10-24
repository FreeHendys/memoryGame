const gameContainer = document.getElementById("game");
const colourBtn = document.getElementById("colour-btn");
const gifBtn = document.getElementById("gif-btn");
const countElem = document.getElementById("count");
const scoreElem = document.getElementById("lowscore");
let clickedCard1 = '';
let clickedCard2 = '';
let count = 0;
let lowScore = 0;
const staticColor = [
  "red",
  "royalblue",
  "green",
  "orange",
  "purple",
  "yellow"
];

const gifLib = [
    'https://media.tenor.com/XV0-URdmz2cAAAAd/blue-kid-dissapears.gif',
    'https://media1.giphy.com/media/B7ppUExX92PjW/giphy.gif?cid=ecf05e479pelf6i8jtodyu5nsdy6s0ck0het0hfwqq0psfc4&rid=giphy.gif&ct=g',
    'https://media3.giphy.com/media/zlVf2eSgXIFFuTnEhz/giphy.gif?cid=ecf05e47lw7ma3qv91etb8fjy0atuax3as29xlv43ow2a2cu&rid=giphy.gif&ct=g',
    'https://media.tenor.com/m3SBhmatvbMAAAAd/seriously-seriously-cat.gif',
    'https://media.tenor.com/FRU2yGmIf1YAAAAd/seriously.gif',
    'https://media.tenor.com/MkyiUsAp8t8AAAAd/tom-and-jerry-tom-the-cat.gif',
  ];

const memArray = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  
  while (counter > 0) {                               // While there are elements in the array
    let index = Math.floor(Math.random() * counter);  // Pick a random index
    counter--;                                        // Decrease counter by 1
    let temp = array[counter];                        // And swap the last element with it
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createCards() {
  let shuffledArray = shuffle(memArray);
  for(let item of shuffledArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(item, 'flipped', 'card');
    newDiv.addEventListener("click", handleCardClick)
    gameContainer.append(newDiv)
  }
}


function handleCardClick(event) {
  if(!clickedCard1 && event.target.classList.contains("flipped")) {
    clickedCard1 = event.target
    clickedCard1.classList.remove("flipped");
    if(clickedCard1.children[0]) {
      clickedCard1.children[0].classList.remove('hide');
    }
    checkMatch(clickedCard1, clickedCard2);
  } else if (!clickedCard2 && event.target.classList.contains("flipped")) {
    clickedCard2 = event.target  
    clickedCard2.classList.remove('flipped');
    if(clickedCard2.children[0]) {
        clickedCard2.children[0].classList.remove('hide');                           
    }                       
    checkMatch(clickedCard1, clickedCard2);                        
    };
}

function checkMatch() {
  if(clickedCard1.classList.value === clickedCard2.classList.value) {
    addCheck(clickedCard1);
    addCheck(clickedCard2);
    clickedCard1 = ''
    clickedCard2 = ''
    count += 1;
    countElem.innertext = count
  } else {
    setTimeout(function(){
      if(clickedCard1.children[0]) {
        clickedCard1.children[0].classList.add('hide');
      }
      clickedCard1.classList.add('flipped');
      if(clickedCard1.children[0]){
        clickedCard2.children[0].classList.add('hide')
      }
      clickedCard2.classList.add('flipped');
      clickedCard1 = '';
      clickedCard2 = '';
    }, 1000);
  };
  count += 1;
  countElem.innerText = count;
}

function addCheck(item) {
  const newSpan = document.createElement("span");
  newSpan.classList.add('match');
  newSpan.innerHTML = '&#10004;';
  item.append(newSpan);
}

function saveScore() {
  if(!document.querySelector('.flipped')) {
    if (!localStorage.getItem('lowscore')){
      localStorage.setItem('lowscore', count);
      lowScore = count;
    } else {
      let score = localStorage.getItem('lowscore');
      if(count < score) {
      localStorage.setItem('lowscore', count);
      lowscore = count;
      } else {
      lowscore = score
      }
    }
    scoreElem.innerText = lowscore
  }
}

function gameReset() {
  saveScore();
  gameContainer.innerHTML = '';
  clickedCard1 = '';
  clickedCard2 = '';
  count = 0;
  countElem.innerText = count;
  colourBtn.innerText = 'Colour Game';
  gifBtn.innerText = 'Gif Game';
}

colourBtn.addEventListener("click", function(e){
    e.preventDefault();
    gameReset();
    colourBtn.innerText = 'Restart';
    createCards();
    applyColor(staticColor);
});

gifBtn.addEventListener("click", function(e){
    e.preventDefault();
    gameReset();
    gifBtn.innerText = "Restart Game!";
    createCards();
    applyGif(gifLib);
});

function applyColor(colorArray) {
  const allCards = document.querySelectorAll('div');
  for (let cards of allCards) {
    if(cards.classList.contains('one')){
      cards.style.backgroundColor = colorArray[0];
    } else if(cards.classList.contains('two')){
      cards.style.backgroundColor = colorArray[1];
    } else if(cards.classList.contains('three')){
      cards.style.backgroundColor = colorArray[2];
    } else if(cards.classList.contains('four')){
      cards.style.backgroundColor = colorArray[3];
    } else if(cards.classList.contains('five')){
      cards.style.backgroundColor = colorArray[4];
    } else if(cards.classList.contains('six')){
      cards.style.backgroundColor = colorArray[5];
    };
  }
}

function applyGif(gifArray) {
  const allCards = document.querySelectorAll('div');
  for (let cards of allCards){
    if(cards.classList.contains('one')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[0]} width="100%" height="210px">`;
      } else if(cards.classList.contains('two')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[1]} width="100%" height="210px">`;
      } else if(cards.classList.contains('three')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[2]} width="100%" height="210px">`;
      } else if(cards.classList.contains('four')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[3]} width="100%" height="210px">`;
      } else if(cards.classList.contains('five')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[4]} width="100%" height="210px">`;
      } else if(cards.classList.contains('six')) {
          cards.innerHTML = `<img class="hide" src=${gifArray[5]} width="100%" height="210px">`;
      };
   }
}

window.addEventListener('load', function() {
  countElem.innerText = count;
  if(!localStorage.getItem('lowscore')) {
    scoreElem.innerText = '';
  } else {
    scoreElem.innerText = this.localStorage.getItem('localscore');
  }
  createCards();
  applyColor(staticColor)
});
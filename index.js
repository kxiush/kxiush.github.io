'use strict';

function log(...something){
    console.log(...something);
}

const screens = document.querySelectorAll('.screen');
const images = document.querySelectorAll('.selection__list__img');
const startButton = document.querySelector('.button');
const time = document.querySelector('.game__time');
const game = document.querySelector('.game');
const score = document.querySelector('.game__score');
const message= document.querySelector('.game__message');

let seconds = 0;
let gameScore = 0;
let selectedAnimals = {};


startButton.addEventListener('click', ()=> {
    screens[0].classList.add('up');
})

images.forEach(el => {
    el.addEventListener('click', ()=> {
       const src = el.getAttribute('src');
       const alt= el.getAttribute('alt');
       selectedAnimals = {src, alt};
       screens[1].classList.add('up');

        setTimeout(createAnimal, 1000);
        startGame();
    });
});


function startGame() {
    setInterval(increaseTime,1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s ;

    time.innerHTML = `Time: ${m} : ${s}`;
    seconds++;
}

function createAnimal() {
    const animal = document.createElement('div');
    animal.classList.add('animal');
    const {x, y} = getRandomLocation();
    animal.style.top = `${y}px`;
    animal.style.left =  `${x}px`;

    animal.innerHTML = `<img src="${selectedAnimals.src}" alt="${selectedAnimals.alt}" style="transform : rotate(${Math.random() * 360}deg)">`;

    animal.addEventListener('click', catchAnimal);
    game.append(animal);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height- 200) + 100;
    return {x, y};
}

function catchAnimal() {
   increaseScore();
   this.classList.add('caught');
   setTimeout(()=>this.remove, 2000);
   addAnimals();
}

function addAnimals() {
    setTimeout(createAnimal, 1000);
    setTimeout(createAnimal, 1500);

}

function increaseScore(){
    gameScore++;

    if(gameScore > 30) {
       message.classList.add('visible');
    }
    score.innerHTML = `Score: ${gameScore}`;
}

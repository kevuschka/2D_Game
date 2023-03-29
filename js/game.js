let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/background_sound.mp3');
let background_music = new Audio('audio/background_music1.mp3');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // background_sound.play();
    // playBackgroundMusic() 
    console.log('My Character is', world.character);
    
    
}

function playBackgroundMusic() {
    background_music.volume = 0.05;
    background_music.loop = true; 
    background_music.play();
}

window.addEventListener("keydown", (event) => {
    if(event.key == 'ArrowRight' ) keyboard.RIGHT = true;
    else if(event.key == 'ArrowLeft' ) keyboard.LEFT = true;
    else if(event.key == ' ' ) keyboard.SPACE = true;
    else if(event.key == 'ArrowUp' ) keyboard.UP = true;
    else if(event.key == 'ArrowDown' ) keyboard.DOWN = true;
});

window.addEventListener("keyup", (event) => {
    if(event.key == 'ArrowRight' ) keyboard.RIGHT = false;
    else if(event.key == 'ArrowLeft' ) keyboard.LEFT = false;
    else if(event.key == ' ' ) keyboard.SPACE = false;
    else if(event.key == 'ArrowUp' ) keyboard.UP = false;
    else if(event.key == 'ArrowDown' ) keyboard.DOWN = false;
})
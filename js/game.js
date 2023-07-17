let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let background_music = new Audio('audio/background_music1.mp3');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    startCountdown();
    
}


function startCountdown() {
    let time = document.getElementById('countdown');
    time.innerHTML = '';
    let sec = 0;
    let min = 0;
    let timer = setInterval( () => {
        sec++;
        resetCountdownSeconds(sec, min)
        setCountdownMinutes(min, time);
        setCountdownSeconds(sec, time);
        if(world.character.dead || world.character.takesPrice) clearInterval(timer);
    }, 1000);
}


function resetCountdownSeconds(sec, min) {
    if(sec == 60) {
        min++;
        sec = 0;
    }
}


function setCountdownMinutes(min, time) {
    if(min > 0) {
        if(min > 9) time.innerHTML = min + ':';
        else time.innerHTML = '0' + min + ':';
    } else time.innerHTML = '00:';
}


function setCountdownSeconds(sec, time) {
    if(sec > 0) {
        if(sec > 9) time.innerHTML += sec;
        else time.innerHTML += '0' + sec;
    } else time.innerHTML += '00';
}


window.addEventListener("keydown", (event) => {
    if(event.key == 'ArrowRight' ) keyboard.RIGHT = true;
    else if(event.key == 'ArrowLeft' ) keyboard.LEFT = true;
    else if(event.key == ' ' ) keyboard.SPACE = true;
    else if(event.key == 'ArrowUp' ) keyboard.UP = true;
    else if(event.key == 'ArrowDown' ) keyboard.DOWN = true;
    else if(event.key == 'd') keyboard.keyD = true;
});

window.addEventListener("keyup", (event) => {
    if(event.key == 'ArrowRight' ) keyboard.RIGHT = false;
    else if(event.key == 'ArrowLeft' ) keyboard.LEFT = false;
    else if(event.key == ' ' ) keyboard.SPACE = false;
    else if(event.key == 'ArrowUp' ) keyboard.UP = false;
    else if(event.key == 'ArrowDown' ) keyboard.DOWN = false;
    else if(event.key == 'd') keyboard.keyD = false;
})
let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let background_music = new Audio('audio/background_music1.mp3');
let fullscreen = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    startCountdown();
    
}


function startCountdown() {
    let time = document.getElementById('countdown');
    time.innerHTML = '00:00';
    let sec = 0;
    let min = 0;
    setCountdown(time, sec, min);
}


function setCountdown(time, sec, min) {
    let timer = setInterval( () => {
        sec++;
        if(!(sec%60)) {
            sec = 0;
            min++;
        }
        setCountdownMinutes(min, time);
        setCountdownSeconds(sec, time);
        if(world.character.dead || world.character.takesPrice) clearInterval(timer);
    }, 1000);
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
});


function resizeFullscreen() {
    if(!fullscreen) openFullscreen();
    else closeFullscreen();
}


function openFullscreen() {
    fullscreen = true;
    let elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen)  /* Firefox */ elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen)  /* Chrome, Safari & Opera */ elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen)  /* IE/Edge */ elem.msRequestFullscreen();
    else closeFullscreen();

    document.getElementById('wrapper').classList.add('wrapperFullscreen');
    document.getElementById('title').classList.add('d-none');
    document.getElementById('canvas').style.height = '100vh';
}


function closeFullscreen() {
    fullscreen = false;
    if (document.exitFullscreen) 
        document.exitFullscreen();
    else if (document.mozCancelFullScreen) 
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) 
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen) 
        document.msExitFullscreen();

    document.getElementById('wrapper').classList.remove('wrapperFullscreen');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('canvas').style.height = '';
}
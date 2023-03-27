let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
    
    
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
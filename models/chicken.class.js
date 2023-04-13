class Chicken extends MovableObject {
    x = 60;
    y = 365;
    width = 50;
    height = 60;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700 (Math.random() erstellt eine Zufallszahl zwischen 0 und 1
        this.speed = 0.15 + Math.random() * 0.5; // Geschwindikeit der Chickens wird zwischen 0.15 und 0.40 liegen
    }


    movingLeft = setInterval( ()=> {
            this.moveLeft();
            if(this.dead) {
                clearInterval(this.animateWalking);
                this.loadImage(this.IMAGES_DEAD);
                this.clearChickenObject();                
                clearInterval(this.movingLeft);
            }
    }, 1000 / 60);


    animateWalking = setInterval( ()=> {
            this.walk();
    }, 60);

    
    walk() {
        this.animateImages(this.IMAGES_WALKING);
    }


    clearChickenObject() {
        setTimeout(() => {
            world.level.enemies.splice(world.level.enemies.indexOf(this), 1);
        }, 8000);
    }

    
}
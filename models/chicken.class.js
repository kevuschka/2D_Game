class Chicken extends MovableObject {
    x = 60;
    y = 365;
    width = 60;
    height = 70;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    IMAGES_DEAD_SMALL = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor(type) {
        super().type = type;
        if(this.type == 'small') this.renderSmallChicken();
        else this.renderNormalChicken();
        this.x = 500 + Math.random() * 5000; // Zahl zwischen 200 und 700 (Math.random() erstellt eine Zufallszahl zwischen 0 und 1
        if(this.x > 3600 && this.x < 4800) this.y = 10 + Math.random() * 365;
    }

    renderSmallChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.speed = 1 + Math.random() * 2;
        this.width = 50;
        this.height = 50;
        this.y = 380;
    }


    renderNormalChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5; // Geschwindikeit der Chickens wird zwischen 0.15 und 0.40 liegen
    }


    movingLeft = setInterval( ()=> {
            this.moveLeft();
            if(this.dead) {
                clearInterval(this.animateWalking);
                if(this.type == 'small') this.loadImage(this.IMAGES_DEAD_SMALL);
                else this.loadImage(this.IMAGES_DEAD);
                this.clearChickenObject();                
                clearInterval(this.movingLeft);
            }
    }, 1000 / 60);


    animateWalking = setInterval( ()=> {
            this.walk();
    }, 60);

    
    walk() {
        if(this.type == 'small') this.animateImages(this.IMAGES_WALKING_SMALL);
        else this.animateImages(this.IMAGES_WALKING);
    }


    clearChickenObject() {
        setTimeout(() => {
            world.level.enemies.splice(world.level.enemies.indexOf(this), 1);
        }, 8000);
    }

    
}
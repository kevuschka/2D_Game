class Chicken extends MovableObject {
    x = 60;
    y = 328;
    width = 80;
    height = 100;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700 (Math.random() erstellt eine Zufallszahl zwischen 0 und 1
        this.speed = 0.15 + Math.random() * 0.5; // Geschwindikeit der Chickens wird zwischen 0.15 und 0.40 liegen
        this.animate();
    }




    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 60);
    }


    eat() {

    }
}
class MovableObject {
    x = 120
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.12;
    currentImage = 0;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Move right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            // if(this.x <= -400) this.x = 300;
        }, 1000 / 60);
    }


}
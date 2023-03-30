class MovableObject extends GameObject {
    imageCache = {};
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }


    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval( () => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            // console.log('speedY-gravity', this.speedY);
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 146;
    }

}
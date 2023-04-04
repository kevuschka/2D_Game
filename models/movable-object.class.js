class MovableObject extends GameObject {
    imageCache = {};
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    dead = false;
    lastHit = 0;

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


    isColliding(enemy) {
        return this.x + this.width - 40 > enemy.x &&
                this.y + this.height >= enemy.y &&
                this.x < enemy.x &&
                this.y < enemy.y + enemy.height;

    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) this.energy = 0;
        else this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed > 5;
    }

    isDead() {
        return this.energy == 0;
    }

}
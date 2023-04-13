class MovableObject extends DrawableObject {
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    dead = false;
    alreadyDead = false;
    lastHit = 0;
    deadTime = 0;



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
        if(this instanceof ThrowableObject) {
            return true;
        } else return this.y < 180;
    }


    isColliding(enemy, offSetLeft, offSetRight, offSetUp) {
        return this.x + this.width > enemy.x + offSetLeft &&
                this.y + this.height >= enemy.y + offSetUp &&
                this.x < enemy.x + offSetRight &&
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
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }

    timeIsPassed() {

    }


}
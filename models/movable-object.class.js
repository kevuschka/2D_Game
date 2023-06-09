class MovableObject extends DrawableObject {
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    dead = false;
    alreadyDead = false;
    lastHit = 0;
    type;


    pain_sound = new Audio('audio/pain.mp3');

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
        }, 1000 / 25);
    }


    isAboveGround() {
        if(this instanceof ThrowableObject ||
            this instanceof Endboss) {
            return true;
        } else return this.y+this.height < 428;
    }

    isInsideGameView() {
        if(this instanceof Character) {
            return this.y + 80 > 0;
        }
    }


    isColliding(enemy, offSetLeft, offSetRight, offSetUp, thisOffSetUp) {
        return this.x + this.width > enemy.x + offSetLeft &&
                this.y + this.height > enemy.y + offSetUp &&
                this.x < enemy.x + enemy.width - offSetRight &&
                this.y + thisOffSetUp < enemy.y + enemy.height;
    }


    isCollidingFromTop(enemy, offSetLeft, offSetRight, offSetUpMax, offSetUpMin) {
        return this.x + this.width > enemy.x + offSetLeft &&
                this.y + this.height > enemy.y + offSetUpMax &&
                this.y + this.height < enemy.y + offSetUpMin &&
                this.x < enemy.x + enemy.width + offSetRight &&
                this.y < enemy.y + enemy.height;
    }


    isCollidingEndboss(enemy, offSetUp) {
        return  this.y                < enemy.y + enemy.height - 100 && 
                this.y + this.height  > enemy.y + offSetUp 
    }


    isCollidingEndbossHead(enemy, offSetLeft, offSetUp, headX, headY) {
        if(!enemy.otherDirection) {
            return this.y + this.height  < enemy.y  + headY + offSetUp &&
            (
                (this.x + this.width > enemy.x + offSetLeft &&
                this.x                < enemy.x + offSetLeft) || 
                (this.x + this.width  > enemy.x  + headX + offSetLeft &&
                this.x                < enemy.x + headX + offSetLeft)
            )
        } else return this.isCollidingEndbossHeadFromRight(enemy, offSetUp, headX, headY)
    }


    isCollidingEndbossHeadFromRight(enemy, offSetUp, headX, headY) {
        return this.y + this.height  < enemy.y  + headY + offSetUp &&
        (
            (this.x + this.width > enemy.x + enemy.width - 60 &&
            this.x                < enemy.x + enemy.width - 60) || 
            (this.x + this.width  > enemy.x + enemy.width - headX - 60 &&
            this.x                < enemy.x + enemy.width - headX - 60)
        )
    }
    

    isCollidingEndbossBody(enemy, offSetLeft, offSetRight, offSetUp, headY) {
        return this.y + this.height  > enemy.y + headY + offSetUp &&
            (
                (this.x + this.width > enemy.x + offSetLeft + 20 &&
                this.x                < enemy.x + offSetLeft + 20) || 
                (this.x + this.width  > enemy.x + enemy.width + offSetRight  &&
                this.x                < enemy.x + enemy.width + offSetRight) || 
                (this.x               > enemy.x + offSetLeft &&
                this.x + this.width   < enemy.x + enemy.width + offSetRight)
            )
    }


    hit() {
        if(this instanceof Endboss) this.energy -= 20;
        else {
            if(!this.isHurt()) this.playHurtSound();
            this.energy -= 0.5;
        } 
        if(this.energy < 0) this.energy = 0;
        else this.lastHit = new Date().getTime();
    }


    kill() {
        this.energy -= 10;
        if(this.energy < 0) this.energy = 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    animateHurting(images) {
        this.animateImages(images);
    }


    playHurtSound() {
        this.pain_sound.currentTime = 0;
        this.pain_sound.volume = 0.7;
        this.pain_sound.play();
    }

}
class ThrowableObject extends CollectableObject {
    speedY = 30;
    speedX = 20;
    width = 60;
    height = 60;
    broken = false;
    throwAnimation;
    directionSet = false;
    hit = false;
    bottleHit_sound = new Audio('audio/glass.mp3');


    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        if(world.character.otherDirection) this.x = x;
        else this.x = x + 60;
        this.y = y + 110;
        this.throw();
        this.runBottle();
    }


    runBottle() {
        setInterval(() => {
            this.hitEnemy();
            this.hitEndboss();
        }, 30);
    }


    hitEnemy() {
        world.level.enemies.forEach(enemy => {
            if(this.isColliding(enemy, 20, 35, 20, 0) && !enemy.dead && !this.broken) {
                this.playBottleCollisionSound();
                enemy.dead = true;
                this.bottleSplash();
            };
        });
    }


    hitEndboss() {
        world.level.endboss.forEach(boss => {
            if(!this.hit && !boss.isDead()) {
                if(this.isCollidingEndboss(boss, 100) &&
                    (this.isCollidingEndbossHead(boss, 60, 100, 35, 100) ||
                    this.isCollidingEndbossBody(boss, 60, -50, 100, 100)))  {
                        this.hit = true;
                        this.playBottleCollisionSound();
                        this.bottleSplash(this);
                        boss.hit();
                        world.statusbarEndboss.setPercentage(boss.energy);
                }
            }
        })
        
    }


    bottleSplash() {
        if(!this.broken) {
            this.broken = true;
            clearInterval(this.throwAnimation);
            this.animateSplash();
        }
        this.collidePosition();
    }


    collidePosition() {
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
    }


    playBottleCollisionSound() {
        this.bottleHit_sound.currentTime = 0;
        // this.bottleHit_sound.volume = 0.5;
        this.bottleHit_sound.play();
    }


    throw() {
        this.animateThrow();
        this.speedY = 25;
        this.applyGravity();
    }


    animateThrow() {
        this.throwAnimation = setInterval(() => {
            if(!this.directionSet) {
                this.directionSet = true;
                if(!world.character.otherDirection) this.throwRight();
                else if(world.character.otherDirection) this.throwLeft();
            }
            this.animateImages(this.IMAGES_BOTTLE);
        }, 70);
    }


    throwRight() {
        setInterval(()=> {
            this.x += this.speedX;
        }, 70);
    }


    throwLeft() {
        setInterval(()=> {
            this.x -= this.speedX;
        }, 70);
    }


    animateSplash() {
        let index = 0;
        this.currentImage = 0;
        let splashy = setInterval(()=> {
            this.animateImages(this.IMAGES_SPLASH);
            index++;
            if(index == 6) {
                clearInterval(splashy);
                world.throwableBottle.splice(world.throwableBottle.indexOf(this), 1);
            }
        }, 90);
    }
}


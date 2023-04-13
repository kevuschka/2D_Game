class ThrowableObject extends CollectableObject {
    speedY = 30;
    speedX = 20;
    width = 60;
    height = 60;
    broken = false;
    throwAnimation;
    directionSet = false;

    

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
        this.x = x + 60;
        this.y = y + 110;
        this.throw();
        this.runBottle();
    }

    runBottle() {
        setInterval(() => {

            world.level.enemies.forEach(enemy => {
                if(this.isColliding(enemy, 20, 35, 20) && !enemy.dead && !this.broken) {
                    enemy.dead = true;
                    if(!this.broken) {
                        this.broken = true;
                        clearInterval(this.throwAnimation);
                        this.animateSplash();
                    }
                    this.collidePosition();
                };
            });

            world.level.endboss.forEach(enemy => {
                if(this.isColliding(enemy, 10, 10, 30)) console.log('HIT enemy');
            });

        }, 30);
    }

    collidePosition() {
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 0;
    }


    throw() {
        this.animateThrow();
        this.speedY = 30;
        this.applyGravity();
    }


    animateThrow() {
        this.throwAnimation = setInterval(() => {
            if(!this.directionSet) {
                this.directionSet = true;
                if(!world.character.otherDirection) this.throwRight();
                else if(world.character.otherDirection) {
                    this.x = this.x - 60;
                    this.throwLeft();
                }
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
                world.throwableBottle = [];
            }
        }, 90);
    }
}


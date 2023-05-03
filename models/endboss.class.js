class Endboss extends MovableObject {
    x = 2500;
    y = 55;
    width = 300;
    height = 400;
    hurtingAnimation;
    walkingAnimation;
    attackingAnimation;
    deadAnimation;
    walking = false;
    attacking = false;
    turnLeft = true;
    // world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        // this.animateImages(this.IMAGES_WALKING);
        this.run();
    }


    run() {
        setInterval( ()=> {
            
            
            if(this.isHurt()) { 
                this.animateEndbossHurting();
            } else if(this.isDead()) {
                this.animateEndbossDead();
            } else {
                this.animateEndbossWalking();
            }
        }, 1000 / 60);
    }


    animateEndbossWalking() {
        
        if(this.turnLeft) this.moveLeft();
        else this.moveRight();
        if(!this.walking) {
            this.clearAllAnimations();
            this.resetAllValues();
            this.walking = true;
            this.walkingAnimation = setInterval(() => {
                this.animateImages(this.IMAGES_WALKING);
            }, 200);
        }   
    }


    animateEndbossAttacking() {
        if(!this.attacking) {
            this.clearAllAnimations();
            this.resetAllValues();
            this.attacking = true;
            this.attackingAnimation = setInterval(() => {
                this.animateImages(this.IMAGES_ATTACK);
            }, 200);
        }
    }


    animateEndbossHurting() {
        if(!this.hurt) {
            this.clearAllAnimations();
            this.resetAllValues();
            this.hurt = true;
            this.hurtingAnimation = setInterval(() => {
                this.animateHurting(this.IMAGES_HURTING);
            }, 100);
        }
    }


    animateEndbossDead() {
        if(!this.dead) {
            this.clearAllAnimations();
            this.resetAllValues();
            this.dead = true;
            this.deadAnimation = setInterval(() => {
                this.animateImages(this.IMAGES_DEAD);
                this.endAtLastPicture();
            }, 200);
        }
    }


    stopHurting() {
        this.hurt = false;
        
        this.animateImages(this.IMAGES_WALKING);
    }


    animateAttack() {
            this.animateImages(this.IMAGES_ATTACK);
    }


    endAtLastPicture() {
        if(this.img == this.imageCache['img/4_enemie_boss_chicken/5_dead/G26.png']) {
            clearInterval(this.deadAnimation);
            this.y = 150;
        }
    }

    pepeIsToClose(pepe) {
        if(pepe.x > this.x - 20 && 
            pepe.x < this.x + this.width + 20) {
                this.animateEndbossAttacking();
        }
    }

    
    checkTurning(pepe) {
        if(pepe.x > this.x + this.width) {
            this.otherDirection = true;
            this.turnLeft = false;
        }
        else if(pepe.x < this.x) {
            this.otherDirection = false;
            this.turnLeft = true;
        }
    }


    walkFasterWhenAttack(pepe) {
        if(this.x - 350 < pepe.x &&
            pepe.x < this.x + this.width + 350) {
                this.speed = 3;
        } else this.speed = 0.12;
    }


    clearAllAnimations() {
        clearInterval(this.walkingAnimation);
        clearInterval(this.hurtingAnimation);
        clearInterval(this.attackingAnimation);
    }


    resetAllValues() {
        this.hurt = false;
        this.walking = false;
        this.attacking = false;
    }


    moveFromBottle() {
        let position = this.x;
        setTimeout(() => {
            this.x = position;
        }, 1000);
        if(this.turnLeft) {
            this.x += 100;
        } else this.x -= 100;
    }
}
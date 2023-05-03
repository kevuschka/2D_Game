class Endboss extends MovableObject {
    x = 2500;
    y = 55;
    width = 300;
    height = 400;
    hurtingAnimation;
    walkingAnimation;
    deadAnimation;
    walking = false;

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
        this.moveLeft();
        if(!this.walking) {
            clearInterval(this.hurtingAnimation);
            this.hurt = false;
            this.walking = true;
            this.walkingAnimation = setInterval(() => {
                this.animateImages(this.IMAGES_WALKING);
            }, 200);
        }   
    }


    animateEndbossAttacking() {

    }


    animateEndbossHurting() {
        if(!this.hurt) {
            clearInterval(this.walkingAnimation);
            this.walking = false;
            this.hurt = true;
            this.hurtingAnimation = setInterval(() => {
                this.animateHurting(this.IMAGES_HURTING);
            }, 100);
        }
    }


    animateEndbossDead() {
        clearInterval(this.hurtingAnimation);
        if(!this.dead) {
            this.dead = true;
            this.deadAnimation = setInterval(() => {
                this.animateImages(this.IMAGES_DEAD);
                if(this.img == this.imageCache['img/4_enemie_boss_chicken/5_dead/G26.png']) {
                    clearInterval(this.deadAnimation);
                    this.y = 150;
                }
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

}
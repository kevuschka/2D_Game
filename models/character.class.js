class Character extends MovableObject {
    x = 60;
    y = 180;
    height = 250 ;
    width = 120;
    world;
    speed = 3;
    lastMove;
    sleeping = false;
    superpower = false;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]


    IMAGES_JUMPING_SPECIAL = [
        'img/10_character_pepe_super/J-31.png',
        'img/10_character_pepe_super/J-32.png',
        'img/10_character_pepe_super/J-33.png',
        'img/10_character_pepe_super/J-34.png',
        'img/10_character_pepe_super/J-35.png',
        'img/10_character_pepe_super/J-36.png',
        'img/10_character_pepe_super/J-37.png',
        'img/10_character_pepe_super/J-38.png',
        'img/10_character_pepe_super/J-39.png'
    ]


    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]


    walking_sound = new Audio('audio/running_long2.mp3');
    jumping_sound = new Audio('audio/jump.mp3')
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.lastMove = new Date().getTime();
    }


    animate() {

        setInterval( () => {
            if(!this.isDead()) {
                if(this.world.keyboard.SPACE || this.isAboveGround()) {
                    this.noWalkingSound();
                    this.animateJumping();
                } else if(!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isHurt()) {
                    this.animateWalking();
                } else if(this.isHurt()) {
                    this.noWalkingSound();
                    this.animateHurting(this.IMAGES_HURTING);
                } else this.noWalkingSound();
            } else if(this.isDead() && !this.dead) {
                this.noWalkingSound();
                this.sleeping = false;
                this.animateDead();
            } else {
                    this.loadImage('img/2_character_pepe/5_dead/D-56.png');
                    this.dead = true;
            }
        }, 80);


        setInterval( () => {
            if(!this.isDead()) {
                if(this.world.keyboard.SPACE || this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.keyD || this.isHurt()) {
                    this.lastMove = new Date().getTime();
                    background_music.volume = 0.2;
                    this.sleeping = false;
                }
                if(this.world.keyboard.SPACE && !this.isAboveGround()) {
                        this.jump();
                }
                else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                        this.moveRight();
                        this.world.moveBackgroundRight();
                        this.otherDirection = false;
                    } else if(this.world.keyboard.LEFT && this.x >= -200) {
                        this.moveLeft();
                        this.world.moveBackgroundLeft();
                        this.otherDirection = true;
                    }
                }
                this.world.camera_x = -this.x + 200;
            } 
        }, 1000 / 60);


        setInterval( () => {
            if(this.isSleeping() && !this.dead) {
                this.sleeping = true;
                this.animateSleeping();
                background_music.volume = 0.05;
            } else if(!(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDead())  {
                if(!this.sleeping) this.animateIdle();
            } 
        }, 300);
    }


    noWalkingSound() {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
    }


    animateIdle() {
        this.animateImages(this.IMAGES_IDLE);
    }

    animateSleeping() {
        this.animateImages(this.IMAGES_LONG_IDLE);
    }

    animateWalking() {
        this.animateImages(this.IMAGES_WALKING);
        this.walking_sound.play();
    }

    animateJumping() {
        this.animateImages(this.IMAGES_JUMPING);
    }

    animateDead() {
        this.animateImages(this.IMAGES_DEAD);
        this.dead = true;
    }

    showDead() {
        this.loadImage('img/2_character_pepe/5_dead/D-56.png');
    }


    // walkingSound() {
    //     this.walking_sound.pause();
    //         this.walking_sound.currentTime = 0;
    // }


    jump() {
        this.jumping_sound.currentTime = 0; 
        this.jumping_sound.volume = 0.6;
        this.jumping_sound.play();
        this.speedY = 20;
    }



    isSleeping() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 5;
    }
}
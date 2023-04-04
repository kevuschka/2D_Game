class Character extends MovableObject {
    x = 60;
    y = 50;
    height = 280;
    width = 150;
    world;
    speed = 3;

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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    animate() {

        

        setInterval( () => {
            if(!this.isDead()) {
                if(this.world.keyboard.SPACE || this.isAboveGround()) {
                    this.noWalkingSound();
                    this.animateJumping();
                } else if(!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) 
                    this.animateWalking();
                else this.noWalkingSound();
            }
            else if(this.isDead() && !this.dead) {
                this.noWalkingSound();
                this.animateDead();
            }
            // else this.loadImage('img/2_character_pepe/5_dead/D-56.png'); ///////////////////////////////
        }, 80);

        setInterval( () => {
            if(!this.isDead()) {
                if(this.world.keyboard.SPACE && !this.isAboveGround()) {
                        this.jump();
                }
                else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                        this.moveRight();
                        this.otherDirection = false;
                    } else if(this.world.keyboard.LEFT && this.x >= -200) {
                        this.moveLeft();
                        this.otherDirection = true;
                    }
                }
                this.world.camera_x = -this.x + 100 ;
            } 
        }, 1000 / 60);

        

        setInterval( () => {
            if(!(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) this.animateIdle();
        }, 300);
    }


    noWalkingSound() {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
    }



    animateIdle() {
        this.animateImages(this.IMAGES_IDLE);
    }


    animateWalking() {
        // this.walking_sound.pause();
        // this.walking_sound.currentTime = 0;
        this.animateImages(this.IMAGES_WALKING);
        this.walking_sound.play();
    }

    animateJumping() {
        this.animateImages(this.IMAGES_JUMPING);
    }

    animateHurting() {
        this.animateImages(this.IMAGES_HURTING);
    }

    animateDead() {
        setTimeout(()=>{
            this.img = this.IMAGES_DEAD[this.IMAGES_DEAD.length-2];
        }, 300);
        this.animateImages(this.IMAGES_DEAD);
        this.dead = true;
    }


    walkindSound() {
        this.walking_sound.pause();
                    this.walking_sound.currentTime = 0;
    }

    jump() {
        this.jumping_sound.currentTime = 0; 
        this.jumping_sound.volume = 0.6;
        this.jumping_sound.play();
        this.speedY = 25;
    }
}
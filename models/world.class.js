class World {
    character = new Character();
    level = level1;
    statusbarHealth = new Statusbar('Health');
    statusbarBottle = new Statusbar('Bottle');
    statusbarCoin = new Statusbar('Coin');
    statusbarEndboss = new Statusbar('Endboss');
    statusbarIconEndboss = new Statusbar('EndbossIcon');
    statusbarDrink = new Statusbar('Drink');
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableBottle = [];
    lastKeyDPressed;
    getGift = false;
    giftTimeout = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // ctx ist ein Objekt, das verantwortlich ist, um auf dem Canvas zu malen. 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        // this.setStatusBars();
        this.draw();
        this.run();
        this.lastKeyDPressed = new Date().getTime();
    }

    setStatusBars() {
        this.statusbarBottle.y = 40;
        this.statusbarCoin.y = 80;
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.barrierObjects);
        
        // --- 
        this.ctx.translate(-this.camera_x, 0); // flip back to left (normal)
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        if(this.character.nearEndboss()) {
            this.addToMap(this.statusbarEndboss);
            this.addToMap(this.statusbarIconEndboss);
        }
        if(this.character.takesGift) this.addToMap(this.statusbarDrink);

        
        this.ctx.translate(this.camera_x, 0); // flip back to right (unnormal)
        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        if(this.level.giftObject) this.addObjectsToMap(this.level.giftObject);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.throwableBottle);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        
        
        
        // draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if( 
            mo instanceof Endboss ||
            mo instanceof BarrierObject || 
            mo instanceof Character || 
            mo instanceof CollectableObject) {
            
            mo.drawFrame(this.ctx);
        }

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // Context-Koordinaten-System versetzt um mo.width auf der horizontalen Ebene
        this.ctx.scale(-1, 1); // Spiegelung des Context-Koordinaten-Systems an der vertikalen Achse
        mo.x = mo.x * -1; // Position von mo
    }


    // Context wieder zurückspiegeln, damit der Rest (ausser Character) normal gerendert wird.
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    run() {
        setInterval(()=> {
            this.checkCollision();
            this.checkThrowableObject();
            this.checkEndbossBehavior();
            this.firstEndbossGift();
            this.pepeDrinkGift();
        }, 1000 / 25);
    }


    checkThrowableObject() {
        if(this.notThrowing()) {
            if(this.keyboard.keyD) {
                this.lastKeyDPressed = new Date().getTime();
                let bottle = new ThrowableObject(this.character.x, this.character.y);
                this.throwableBottle.push(bottle);
            }
        }
    }


    notThrowing() {
        let timepassed = new Date().getTime() - this.lastKeyDPressed;
        timepassed = timepassed / 1000;
        return timepassed > 0.3;
    }


    checkEndbossBehavior() {
        this.level.endboss.forEach(boss => {
            if(!boss.isDead() && !this.character.isDead()) {
                boss.checkTurning(this.character);
                boss.spotting(this.character);
                boss.pepeIsToClose(this.character);
            }
        });
    }


    firstEndbossGift() {
        if(this.level.endboss.length != 1 && !this.giftTimeout && 
            !this.getGift && this.level.endboss[0].isDead()) {
            let x = this.level.endboss[0].x + this.level.endboss[0].width;
            this.giftTimeout = true;
            setTimeout(() => {
                this.level.giftObject.push(new GiftObject(x));
                this.getGift = true;
            }, 5000);
        }
    }


    pepeDrinkGift() {
        if(this.character.takesGift && !this.character.hasSuperPower) {
            let lucid_air = [];
            for (let i = 0; i < this.level.backgroundObjects.length/4; i++) {
                let x = this.level.backgroundObjects[i].x;
                lucid_air.push(new BackgroundObject(x,'img/5_background/layers/air_lucid.png'));
            }

            this.level.backgroundObjects.splice(0,12);
            this.level.backgroundObjects = lucid_air.concat(this.level.backgroundObjects);
            this.character.hasSuperPower = true;
            this.level.barrierObjects.forEach((cactus) => {
                cactus.move = true;
            });
        }
    }


    checkCollision() {
        this.checkCollisionChicken();
        this.checkCollisionEndboss();
        this.checkCollisionCactus();  
        this.checkCollisionGift();  
    }


    checkCollisionChicken() {
        this.level.enemies.forEach((enemy) => 
            {
                if(this.character.isCollidingFromTop(enemy, 40, -40, 20, 40) && !this.character.isDead() && 
                    !enemy.dead && this.character.speedY < 0) {
                        enemy.dead = true;
                        this.character.speedY = 10;
                }
                if(this.character.isColliding(enemy, 35, 35, 20) && !this.character.isDead() && !enemy.dead) {
                        this.character.hit();
                        this.statusbarHealth.setPercentage(this.character.energy);
                }
            });
    }


    checkCollisionEndboss() {
        this.level.endboss.forEach(enemy => {
            if(!enemy.isDead()) {
                if(this.character.isColliding(enemy, 70, 120, 20) && !this.character.isDead() && !enemy.hurt) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        })
        
    }


    checkCollisionCactus() {
        this.level.barrierObjects.forEach((barrier) => {
            if(this.character.isColliding(barrier, 70, 60, 20) && !this.character.isDead()) {
                if(!this.level.barrierObjects[0].move) this.character.hit();
                else this.character.kill();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionGift() {
        if(this.getGift && !this.character.takesGift && !this.character.hasSuperPower) {
            this.level.giftObject.forEach((gift) => {
                if(this.character.isColliding(gift, 20, 20 , 20) && 
                    !this.character.isDead() &&
                    this.character.y + 90 < gift.y) {
                    this.character.takesGift = true;
                    this.level.giftObject = [];
                }
            });
        }
    }


    moveBackgroundRight() {
        for (let i = 0; i < this.level.clouds.length; i++)
            this.level.clouds[i].x += 1.0;  
        for (let i = 0; i < this.level.backgroundObjects.length/4; i++) 
            this.level.backgroundObjects[12+i].x += 1;
        for (let i = 0; i < this.level.backgroundObjects.length/4; i++) 
            this.level.backgroundObjects[24+i].x += 0.6;
        
    }


    moveBackgroundLeft() {
        for (let i = 0; i < 8; i++)
            this.level.clouds[i].x -= 1;  
        for (let i = 0; i < this.level.backgroundObjects.length/4; i++) 
            this.level.backgroundObjects[(this.level.backgroundObjects.length/4)+i].x -= 1;
        for (let i = 0; i < this.level.backgroundObjects.length/4; i++) 
            this.level.backgroundObjects[(this.level.backgroundObjects.length/4)*2+i].x -= 0.6;   
    }

}
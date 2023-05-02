class World {
    character = new Character();
    level = level1;
    statusbarHealth = new Statusbar(1);
    statusbarBottle = new Statusbar(2);
    statusbarCoin = new Statusbar(3);
    statusbarEndboss = new Statusbar(4);
    statusbarIconEndboss = new Statusbar(5);
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableBottle = [];
    lastKeyDPressed;
    

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

        
        // --- 
        this.ctx.translate(-this.camera_x, 0); // flip back to left (normal)
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        if(this.character.x > this.level.endboss.x - 580) {
            this.addToMap(this.statusbarEndboss);
            this.addToMap(this.statusbarIconEndboss);
        }
        
        this.ctx.translate(this.camera_x, 0); // flip back to right (unnormal)
        
        
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
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

    checkCollision() {
        this.checkCollisionChicken();
        this.checkCollisionWithEndboss();
        
    }

    checkCollisionChicken() {
        this.level.enemies.forEach((enemy) => 
            {
                if(this.character.isCollidingFromTop(enemy, 40, -40, 20, 40) && !this.character.isDead() && !enemy.dead && this.character.speedY < 0) {
                    enemy.dead = true;
                    this.character.speedY = 10;
                    
                }
                if(this.character.isColliding(enemy, 35, 0, 20) && !this.character.isDead() && !enemy.dead) {
                        this.character.hit();
                        this.statusbarHealth.setPercentage(this.character.energy);
                }
            });
    }

    checkCollisionWithEndboss() {
        let enemy = this.level.endboss;
        if(this.character.isColliding(enemy, 70, 220, 20) && !this.character.isDead()) {
            this.character.hit();
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }

}
class World {
    character = new Character();
    level = level1;
    statusbarHealth = new Statusbar(1);
    statusbarBottle = new Statusbar(2);
    statusbarCoin = new Statusbar(3);
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // ctx ist ein Objekt, das verantwortlich ist, um auf dem Canvas zu malen. 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        // this.setStatusBars();
        this.draw();
        this.checkCollision();
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
        this.ctx.translate(this.camera_x, 0); // flip back to right (unnormal)

        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
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

        if(mo instanceof Character || mo instanceof Chicken || mo instanceof Endboss || mo instanceof Bottle || mo instanceof Coin) {
            
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

    


    checkCollision() {
        setInterval(()=> {
            this.level.enemies.forEach((enemy) => 
                {
                    if(this.character.isColliding(enemy, 35, 0) && !this.character.isDead()) {
                            this.character.hit();
                            this.statusbarHealth.setPercentage(this.character.energy);
                            // console.log('energy', this.character.energy);
                    }
                });
            this.level.endboss.forEach((enemy) => 
                {
                    if(this.character.isColliding(enemy, 70, 220) && !this.character.isDead()) {
                        this.character.hit();
                        this.statusbarHealth.setPercentage(this.character.energy);
                    }
                });
  
        }, 100);
    }
}
class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // ctx ist ein Objekt, das verantwortlich ist, um auf dem Canvas zu malen. 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

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
        
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

     
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
}
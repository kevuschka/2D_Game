class World {
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png'),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png'),
    ];

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    ctx;
    canvas;
    

    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); // ctx ist ein Objekt, das verantwortlich ist, um auf dem Canvas zu malen. 
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
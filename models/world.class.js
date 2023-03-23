class World {
    
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = new Cloud();
    ctx;
    canvas;
    bgFirstLayer = new BgFirstLayer();
    bgSecondLayer = new BgSecondLayer();
    bgThirdLayer = new BgThirdLayer();
    air = new Air();
    
    // self = this;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); // ctx ist ein Objekt, das verantwortlich ist, um auf dem Canvas zu malen. 
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.air.img, this.bgThirdLayer.x, this.bgThirdLayer.y, this.bgThirdLayer.width, this.bgThirdLayer.height);
        this.ctx.drawImage(this.bgThirdLayer.img, this.bgThirdLayer.x, this.bgThirdLayer.y, this.bgThirdLayer.width, this.bgThirdLayer.height);
        this.ctx.drawImage(this.bgSecondLayer.img, this.bgThirdLayer.x, this.bgThirdLayer.y, this.bgThirdLayer.width, this.bgThirdLayer.height);
        this.ctx.drawImage(this.bgFirstLayer.img, this.bgThirdLayer.x, this.bgThirdLayer.y, this.bgThirdLayer.width, this.bgThirdLayer.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        this.ctx.drawImage(this.clouds.img, this.clouds.x, this.clouds.y, this.clouds.width, this.clouds.height);
        
        
        // draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });

    }
}
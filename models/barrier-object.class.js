class BarrierObject extends MovableObject {
    y = 177;
    width = 130;
    height = 250;
    move = false;
    speed = 5;
    
    constructor(x) {
        super().loadImage('img/cactus.png');
        this.x = x;
    }


    movingLeft = setInterval(() => {
        if(this.move) this.moveLeft();
    }, 1000 / 60);


}
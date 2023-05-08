class BarrierObject extends DrawableObject {
    y = 177;
    width = 130;
    height = 250;
    
    constructor(x) {
        super().loadImage('img/cactus.png');
        this.x = x;
    }
}
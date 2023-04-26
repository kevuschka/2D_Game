class Cloud extends MovableObject {
    x = 100;
    y = 10;
    width = 600;
    height = 300;
    
    constructor(x, imgPath) {
        super().loadImage(imgPath);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    

}
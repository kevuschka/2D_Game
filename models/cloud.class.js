class Cloud extends MovableObject {
    x = 300;
    y = 10;
    width = 600;
    height = 300;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.12;
        }, 1000 / 60);
    }

    

}
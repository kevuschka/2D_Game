class Coin extends MovableObject {
    x = 700;
    y = 230;
    width = 150;
    height = 150;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES);
        }, 400);
    }
}
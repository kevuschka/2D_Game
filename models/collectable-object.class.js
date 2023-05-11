class CollectableObject extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    IMAGE_BOTTLE = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';


    constructor(type) {
        super().type = type;
        if(type == 'Coin') this.coin();
        else if(type == 'Bottle') this.bottle();
        this.x = Math.random() * 2300; // Zahl zwischen 200 und 700 (Math.random() erstellt eine Zufallszahl zwischen 0 und 1
    }


    coin() {
        this.y = 250 - Math.random() * 100;
        this.width = 150;
        this.height = 150;
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate(this.IMAGES_COIN);
    }


    animate(images) {
        setInterval(() => {
            this.animateImages(images);
        }, 400);
    }


    bottle() {
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.loadImage(this.IMAGE_BOTTLE);
    }


    
}

class CollectableObject extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    IMAGE_BOTTLE = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

    IMAGES_DRINK = [
        'img/gift/drink_1.png',
        'img/gift/drink_2.png',
        'img/gift/drink_3.png',
        'img/gift/drink_4.png',
        'img/gift/drink_5.png',
        'img/gift/drink_6.png',
        'img/gift/drink_7.png',
        'img/gift/drink_8.png',
        'img/gift/drink_9.png'
    ]

    constructor(type, x = 0) {
        super().type = type;
        this.loadAllImages();
        if(type == 'Coin') this.coin();
        else if(type == 'Bottle') this.bottle();
        else this.drink();
        if(!x) this.x = Math.random() * 2300; // Zahl zwischen 200 und 700 (Math.random() erstellt eine Zufallszahl zwischen 0 und 1
        else this.x = x;
    }


    loadAllImages() {
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_DRINK);
        this.loadImage(this.IMAGE_BOTTLE);
    }


    coin() {
        this.y = 250 - Math.random() * 100;
        this.width = 150;
        this.height = 150;
        this.loadImage('img/8_coin/coin_1.png');
        // this.loadImages(this.IMAGES_COIN);
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
        // this.loadImage(this.IMAGE_BOTTLE);
    }


    drink() {
        this.y = 0;
        this.width = 30;
        this.height = 50;
        // this.loadImages(this.IMAGES_DRINK);
        this.animate(this.IMAGES_DRINK);
        let fallDown = setInterval(() => {
            this.y += 5;
            if(this.y == 350) clearInterval(fallDown);
        }, 50);
    }
}

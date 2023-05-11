class GiftObject extends CollectableObject {

    y = 0;
    width = 30;
    height = 50;


    IMAGES_DRINK = [
        'img/gift/drink_1.png',
        'img/gift/drink_2.png',
        'img/gift/drink_3.png',
        'img/gift/drink_4.png',
        'img/gift/drink_5.png',
        'img/gift/drink_6.png',
        'img/gift/drink_7.png',
        'img/gift/drink_8.png'
    ]


    constructor(x) {
        super().x = x;
        this.loadImage('img/gift/drink_1.png');
        this.loadImages(this.IMAGES_DRINK);
        this.animate(this.IMAGES_DRINK);
        this.gettingGift();
    }

    gettingGift() {
        let fallDown = setInterval(() => {
            this.y += 5;
            if(this.y == 350) clearInterval(fallDown);
        }, 50);
    }
}
class Statusbar extends DrawableObject {
    x = 13;
    y = 0;
    width = 150;
    height = 45; 
    otherDirection = false;

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'
    ];

    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    ];

    IMAGES_ICON_ENDBOSS = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ]

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    ];

    IMAGE_DRINK = [
        'img/gift/drink_1.png'
    ];

    percentage = 100;
    IMAGES = [];


    constructor(name) {
        if(name == 'Health')  super().IMAGES = this.IMAGES_HEALTH;
        else if(name == 'Bottle') {
            super().IMAGES = this.IMAGES_BOTTLE;
            this.y = 40;
        } else if(name == 'Coin') {
            super().IMAGES = this.IMAGES_COIN;
            this.y = 80;
        } else if(name == 'Endboss') {
            super().IMAGES = this.IMAGES_HEALTH_ENDBOSS;
            this.otherDirection = true;
            this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
            this.x = 560;
        } else if(name == 'EndbossIcon') {
            super().IMAGES = this.IMAGES_ICON_ENDBOSS;
            this.x = 677;
            this.y = 6;
            this.width = 40;
            this.otherDirection = true;
        } else {
            super().IMAGES = this.IMAGE_DRINK;
            this.x = 180;
            this.y = 10;
            this.width = 15;
            this.height = 30;
        }
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; 
    }


    resolveImageIndex() {
        if(this.percentage == 100)
            return 0;
        if(this.percentage > 80)
            return 1;
        if(this.percentage > 60)
            return 2;
        if(this.percentage > 40)
            return 3;
        if(this.percentage > 20)
            return 4;
        else return 5;
    }
}


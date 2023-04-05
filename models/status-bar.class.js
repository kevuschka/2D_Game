class Statusbar extends DrawableObject {
    x = 13;
    y = 0;
    width = 150;
    height = 45; 

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    ]

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    ]

    percentage = 100;
    IMAGES = [];

    constructor(number) {
        if(number == 1)  super().IMAGES = this.IMAGES_HEALTH;
        else if(number == 2) {
            super().IMAGES = this.IMAGES_BOTTLE;
            this.y = 40;
        } else if(number == 3) {
            super().IMAGES = this.IMAGES_COIN;
            this.y = 80;
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
            return 5;
        if(this.percentage > 80)
            return 4;
        if(this.percentage > 60)
            return 3;
        if(this.percentage > 40)
            return 2;
        if(this.percentage > 20)
            return 1;
        else return 0;
    }
}


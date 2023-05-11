class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjects;
    barrierObjects;
    giftObject;
    
    level_end_x = 10000;

    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjects, barrierObjects, giftObject) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.barrierObjects = barrierObjects;
        this.giftObject = giftObject;
    }
}
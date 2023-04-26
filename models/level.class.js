class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 3000;

    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}
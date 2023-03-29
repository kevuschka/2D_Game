class GameObject {
    x = 120
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.12;
    currentImage = 0;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}
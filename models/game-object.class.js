class GameObject {
    x = 120
    y = 250;
    img;
    height = 150;
    width = 100;
    currentImage = 0;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}
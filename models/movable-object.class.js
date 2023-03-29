class MovableObject extends GameObject {
    

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Move right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            // if(this.x <= -400) this.x = 300;
        }, 1000 / 60);
    }

    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}
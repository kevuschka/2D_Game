class GiftObject extends CollectableObject {



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
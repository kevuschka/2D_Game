let background = [];

const level1 = new Level(
    [
        new Chicken(0),
        new Chicken(1),
        new Chicken(2)
    ],
    [
        new Endboss()
    ],
    [
        new Cloud()
    ],
        renderBackgroundObjects(),
    [
        new Bottle()
    ],
    [
        new Coin()
    ]
)


function renderBackgroundObjects() {
    for (let i = -1; i < 3; i++) {
        background.push(new BackgroundObject((2*i) * 719,'img/5_background/layers/air.png'));
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/3_third_layer/1.png'));
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/2_second_layer/1.png'));
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/1_first_layer/1.png'));
        background.push(new BackgroundObject((2*i+1) * 719,'img/5_background/layers/air.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/3_third_layer/2.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/2_second_layer/2.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/1_first_layer/2.png'));
    }
    return background;
}
let background = [];
let cloud = [];
let enemy = [];

const level1 = new Level(
        renderEnemyObjects(),
        [
            new Endboss(2430),
            new Endboss(3500)
        ],
        
        renderCloudObjects(),
        renderBackgroundObjects(),
    [
        new CollectableObject('Coin'),
        new CollectableObject('Coin'),
        new CollectableObject('Coin'),
        new CollectableObject('Coin'),
        new CollectableObject('Coin'),
        new CollectableObject('Bottle'),
        new CollectableObject('Bottle')
    ],
    [
        new BarrierObject(3300),
        new BarrierObject(3900)
    ]
)

function renderEnemyObjects() {
    for (let i = 0; i < 2; i++) {
        enemy.push(new Chicken());
    }
    for (let i = 0; i < 1; i++) {
        enemy.push(new Chicken('small'));
    }
    return enemy;
}


function renderCloudObjects() {
    for (let i = 0; i < 6; i++) {
        cloud.push(new Cloud(100 + (2*i) * 700, 'img/5_background/layers/4_clouds/1.png'));
        cloud.push(new Cloud(100 + (2*i+1) * 700, 'img/5_background/layers/4_clouds/2.png'));
    }
    return cloud;
}


function renderBackgroundObjects() {
    renderAir();
    renderThirdLayer();
    renderSecondLayer();
    renderFirstLayer();
    return background;
}


function renderAir() {
    for (let i = -1; i < 5; i++) {
        background.push(new BackgroundObject((2*i) * 719,'img/5_background/layers/air.png'));
        background.push(new BackgroundObject((2*i+1) * 719,'img/5_background/layers/air.png'));
    }
}

function renderThirdLayer() {
    for (let i = -1; i < 5; i++) {
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/3_third_layer/1.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/3_third_layer/2.png'));
    }
}

function renderSecondLayer() {
    for (let i = -1; i < 5; i++) {
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/2_second_layer/1.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/2_second_layer/2.png'));
    }
}

function renderFirstLayer() {
    for (let i = -1; i < 5; i++) {
        background.push(new BackgroundObject((2*i) * 719, 'img/5_background/layers/1_first_layer/1.png'));
        background.push(new BackgroundObject((2*i+1) * 719, 'img/5_background/layers/1_first_layer/2.png'));
    }
}






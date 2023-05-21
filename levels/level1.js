let background = [];
let cloud = [];
let enemy = [];
let collect = [];

const level1 = new Level(
        renderEnemyObjects(),
        [
            new Endboss(2430),
            new Endboss(6000)
        ],
        
        renderCloudObjects(),
        renderBackgroundObjects(),
        renderCollectableObjects(),
    [
        new BarrierObject(3300),
        new BarrierObject(3900),
        new BarrierObject(4500),
        new BarrierObject(5100),
        new BarrierObject(8000),
        new BarrierObject(9000)
    ],
    []
)

function renderEnemyObjects() {
    for (let i = 0; i < 20; i++) enemy.push(new Chicken());
    for (let i = 0; i < 25; i++) enemy.push(new Chicken('small'));
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


function renderCollectableObjects() {
    for (let i = 0; i < 10; i++) collect.push(new CollectableObject('Coin'));
    for (let i = 0; i < 20; i++) collect.push(new CollectableObject('Bottle'));
    return collect;
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






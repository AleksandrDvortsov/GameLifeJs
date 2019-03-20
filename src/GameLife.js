var matrixSize = 40;
var lifeMatrix = [];
var SPEED_LIFE = 100;
var CELL_SIZE = 15;
var isStop = false;

var btnStart = document.getElementById("start");
var btnReset = document.getElementById("reset")

// если (1 == 2 == 3) больше чем 10раз (stopGame) то игра останавливается.
var counterStopGame1 = 0;
var counterStopGame2 = 0;
var counterStopGame3 = 0;
var stopGame = 0;

var renderPixi = new PIXI.CanvasRenderer ({
    width: matrixSize * CELL_SIZE + matrixSize,
    height: matrixSize * CELL_SIZE + matrixSize,
    backgroundColor: 0xff5f00
});

document.body.appendChild(renderPixi.view);

var stage = new PIXI.Stage;

function init() {
    createMatrixLefe();
    draw();
}

function createMatrixLefe() {
    for (var i = 0; i < matrixSize; i++){
        lifeMatrix[i] = [];
        for (var j = 0; j < matrixSize; j++){
            lifeMatrix[i][j] = Math.random() >= 0.5;
        }
    }
}

function reset() {
    isStop = false;
    btnStart.disabled = false;
    counterStopGame1 = counterStopGame2 = counterStopGame3 = stopGame = 0;
    createMatrixLefe();
    draw();
}

function start() {
    btnStart.disabled = true;
    btnReset.disabled = true;
    lifeDevelopment();
}

function lifeDevelopment() {
    var timer = setInterval(function () {
        if(isStop){
            clearInterval(timer);
            alert('Life is over! Pls click to "reset"');
            btnReset.disabled = false;
        }
        controller();
    }, SPEED_LIFE)
}

function draw() {

    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            var button = new PIXI.Sprite(PIXI.Texture.WHITE);
            if (lifeMatrix[i][j]) {
                button.tint = 0xffffff;
            } else {
                button.tint = 0x000000;
            }
            button.width = button.height = CELL_SIZE;
            button.x = i * CELL_SIZE + i;
            button.y = j * CELL_SIZE + j;

            stage.addChild(button);
        }
    }

    renderPixi.render(stage);
}

function redraw() {
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            if (lifeMatrix[i][j]) {
                stage.children[i*matrixSize +j].tint = 0xffffff;
            } else {
                stage.children[i*matrixSize +j].tint = 0x000000;
            }
        }
    }
    renderPixi.render(stage);
}

init();
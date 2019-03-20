function controller() {

    var newMatrix = [];
    for (var i = 0; i < matrixSize; i++){
        newMatrix[i] = [];
        for (var j = 0; j < matrixSize; j++){
            newMatrix[i][j] = false;
        }}

    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            var count = countNeighbors(i, j, matrixSize);
            newMatrix[i][j] = lifeMatrix[i][j];
            if (count === 3) {
                newMatrix[i][j] = true;
            } else if (count < 2 || count > 3) {
                newMatrix[i][j] = false;
            } else {
                newMatrix[i][j] = newMatrix[i][j];
            }
        }
    }

    lifeMatrix = newMatrix;

    if (!isOver(lifeMatrix)) {
        isStop = true;
        counterStopGame1 = counterStopGame2 = counterStopGame3 = stopGame = 0;
    }else {
        redraw();
    }
}

function isOver(lifeMatrix) {
    var c = 0;
    counterStopGame3 = counterStopGame2;

    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            if (lifeMatrix[i][j]) {
                c++;
                counterStopGame1 = c;
            }
        }
    }
    if (counterStopGame1 === counterStopGame2 && counterStopGame3 === counterStopGame2) {
        stopGame++;
        if (stopGame > 10) {
            return false;
        }
        return c !== 0;

    } else {
        stopGame = 0;
        counterStopGame2 = counterStopGame1;
        return true;
    }
}

function countNeighbors(x, y, countM) {
    var count = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var newX = x + i;
            var newY = y + j;
            if (newX < 0) {
                newX = countM - 1;
            }
            if (newY < 0) {
                newY = countM - 1;
            }
            if (newX > countM - 1) {
                newX = 0;
            }
            if (newY > countM - 1) {
                newY = 0;
            }

            if (lifeMatrix[newX][newY]) {
                count += 1;
            } else {
                count += 0;
            }
        }
    }

    if (lifeMatrix[x][y]) {
        count--;
    }
    return count;
}
this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     * stateless static class
     * @type {{}}
     */
    var Logic = {};


    // Matrix Block move + draw
    Logic._initMoveTicker = function (ticker) {
        var m = ns.Main;
        ticker.init(m.FPS, callback.bind(m, m.MATRIX_HEIGHT, m.MATRIX_WIDTH));
        ticker.start();

//        callback test:
        function callback(height, width, matrixBlocks, activeTetrimino) {
            var nextStepTetriminoBlocks = m.activeTetrimino.afterMoveDown().getAsMatrixBlockArr();

            if (_isCollision(m.matrixBlocks, nextStepTetriminoBlocks, height, width)) {
                m.matrixBlocks = m.matrixBlocks.concat(m.activeTetrimino.getAsMatrixBlockArr());
                m.activeTetrimino = ns.Tetrimino.getRandomTetrimino();
                if (_isCollision(m.matrixBlocks, m.activeTetrimino.getAsMatrixBlockArr(), height, width)) {
                    m._gameOver();
                }
            } else {
                m.activeTetrimino = m.activeTetrimino.afterMoveDown();
            }

            m.matrixBlocks = _matrixAfterRemoveFullLines(m.matrixBlocks, width);
            m.reDraw();
        }

    }


    Logic.moveLeft = function () {
        console.log("left");
        // TODO: replace direct calls with event handler!!
        var preProcessed = ns.Main.activeTetrimino.afterMoveLeft();
        this._processMatrix(preProcessed);
    }

    Logic.moveRight = function () {
        console.log("right");
        // TODO: replace direct calls with event handler!!
        var preProcessed = ns.Main.activeTetrimino.afterMoveRight();
        this._processMatrix(preProcessed);
    }

    Logic.moveUp = function () {
        console.log("up");
        // TODO: replace direct calls with event handler!!
        throw "not implemented yet";
    }

    Logic.rotateRight = function () {
        console.log("rotate right");
        // TODO: replace direct calls with event handler!!
        var preProcessed = ns.Main.activeTetrimino.afterRotateRight();
        this._processMatrix(preProcessed);
    }

    Logic.rotateLeft = function () {
        console.log("rleft");
        // TODO: replace direct calls with event handler!!
        var preProcessed = ns.Main.activeTetrimino.afterRotateLeft();
        this._processMatrix(preProcessed);

    }

    Logic.moveDown = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        var preProcessed = ns.Main.activeTetrimino.afterMoveDown();
        this._processMatrix(preProcessed);
    }


    Logic._processMatrix = function (preProcessedMatrix) {
        if (!_isCollision(ns.Main.matrixBlocks, preProcessedMatrix.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH)) {
            ns.Main.activeTetrimino = preProcessedMatrix;
            ns.Main.reDraw();
        }
    }


    function _matrixAfterRemoveFullLines(matrixBlocks, matrixWidth) {
        var tmpMatrixBlocks = matrixBlocks.slice(0);
        var lines = [];
        for (var i = 0; i < ns.Main.MATRIX_HEIGHT; i++) {
            lines[i] = 0;
        }

        // initialize array -> functional way
        // var lines = Array.apply(null,Array(ns.Main.MATRIX_HEIGHT)).map(function(){return 0;});

        // sum the line elements
        tmpMatrixBlocks.forEach(function (block) {
            lines[block.y]++;
        });

        lines.forEach(function (lineLen, line) {
            if (lineLen === matrixWidth) {
                // remove line
                tmpMatrixBlocks = tmpMatrixBlocks.filter(function (block) {
                    return block.y !== line;
                });

                // step down the upper blocks
                tmpMatrixBlocks = tmpMatrixBlocks.map(function (block) {
                    var y;
                    if (block.y < line) {
                        y = block.y + 1;
                    } else {
                        y = block.y;
                    }
                    return new ns.MatrixBlock(block.x, y, block.color);
                });

            }
        });

        return tmpMatrixBlocks;
    }


    function _isCollision(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth) {

        var isCollision = tetriminoBlocks.some(
            function (tetriminoBlock) {
                var endColl = _isOnMatrixEndCollision(tetriminoBlock, matrixHeight);
                var sideColl = _isOnMatrixSideCollision(tetriminoBlock, matrixWidth);
                var blockColl = matrixBlocks.some(
                    function (matrixBlock) {
                        return _isBlockCollision(matrixBlock, tetriminoBlock);
                    }
                );
                return endColl || sideColl || blockColl;
            }
        );

        return isCollision;
    }

    function _isBlockCollision(blockA, blockB) {
        return (blockA.x === blockB.x) && (blockA.y === blockB.y);
    }

    function _isOnMatrixEndCollision(block, matrixHeight) {
        return _isOutsideArrInterval(block.y, 0, matrixHeight - 1);
    }

    function _isOnMatrixSideCollision(block, matrixWidth) {
        return _isOutsideArrInterval(block.x, 0, matrixWidth - 1);
    }

    function _isOutsideArrInterval(value, min, max) {
        return (value < min) || (value > max);
    }


    /* test-code */
    Logic.__testonly__ = {};
    Logic.__testonly__._isBlockCollision = _isBlockCollision;
    Logic.__testonly__._isOnMatrixEndCollision = _isOnMatrixEndCollision;
    Logic.__testonly__._isOnMatrixSideCollision = _isOnMatrixSideCollision;
    Logic.__testonly__._isCollision = _isCollision;
    /* end-test-code */

    ns.Logic = Logic;

})(this.dippejs)
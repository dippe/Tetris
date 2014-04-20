this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     * stateless static class
     * @type {{}}
     */
    var Logic = {};

    var _activeTetrimino;
    var _matrixBlocks = [];

    Logic.init = function () {
        _activeTetrimino = new ns.Tetrimino.getRandomTetrimino();
    }

    Logic.tickerCallback = function (height, width, matrixBlocks, activeTetrimino) {
        var m = this;
        var nextStepTetriminoBlocks = _activeTetrimino.afterMoveDown().getAsMatrixBlockArr();

        if (_isCollision(_matrixBlocks, nextStepTetriminoBlocks, height, width)) {
            _matrixBlocks = _matrixBlocks.concat(_activeTetrimino.getAsMatrixBlockArr());
            _activeTetrimino = ns.Tetrimino.getRandomTetrimino();
            if (_isCollision(_matrixBlocks, _activeTetrimino.getAsMatrixBlockArr(), height, width)) {
                ns.Main.gameOver();
            }
        } else {
            _activeTetrimino = _activeTetrimino.afterMoveDown();
        }

        _matrixBlocks = _matrixAfterRemoveFullLines(_matrixBlocks, width);
        m.reDraw();
    }


    Logic.reDraw = function () {
        var tetriminoBlocks = _activeTetrimino.getAsMatrixBlockArr();
        var matrixBlocks = _matrixBlocks;

        ns.Main.drawer.clear()
            .drawMatrixBlocks(matrixBlocks)
            .drawMatrixBlocks(tetriminoBlocks);

        // Todo remove after testing phase
        ns.Main.drawerTest.clear()
            .drawMatrixBlocks(matrixBlocks)
            .drawMatrixBlocks(tetriminoBlocks);

    }


    Logic.moveLeft = function () {
        console.log("left");
        // TODO: replace direct calls with event handler!!
        var preProcessed = _activeTetrimino.afterMoveLeft();
        this._processMatrix(preProcessed);
    }

    Logic.moveRight = function () {
        console.log("right");
        // TODO: replace direct calls with event handler!!
        var preProcessed = _activeTetrimino.afterMoveRight();
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
        var preProcessed = _activeTetrimino.afterRotateRight();
        this._processMatrix(preProcessed);
    }

    Logic.rotateLeft = function () {
        console.log("rleft");
        // TODO: replace direct calls with event handler!!
        var preProcessed = _activeTetrimino.afterRotateLeft();
        this._processMatrix(preProcessed);

    }

    Logic.moveDown = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        var preProcessed = _activeTetrimino.afterMoveDown();
        this._processMatrix(preProcessed);
    }


    Logic._processMatrix = function (preProcessedMatrix) {
        if (!_isCollision(_matrixBlocks, preProcessedMatrix.getAsMatrixBlockArr(), ns.Const.Main.MATRIX_HEIGHT, ns.Const.Main.MATRIX_WIDTH)) {
            _activeTetrimino = preProcessedMatrix;
            ns.Logic.reDraw();
        }
    }


    function _matrixAfterRemoveFullLines(matrixBlocks, matrixWidth) {
        var tmpMatrixBlocks = matrixBlocks.slice(0);
        var lines = [];
        for (var i = 0; i < ns.Const.Main.MATRIX_HEIGHT; i++) {
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
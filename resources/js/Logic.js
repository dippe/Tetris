this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     * stateless static class
     * @type {{}}
     */
    var Logic = {};

    Logic.matrixAfterRemoveFullLines = function (matrixBlocks, matrixWidth) {
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


    Logic.isNextStepCollision = function (matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, offsetX, offsetY) {
        var nextStepTetriminoBlocks = [];

        nextStepTetriminoBlocks = tetriminoBlocks.map(function (block) {
            return new ns.MatrixBlock(block.x + offsetX, block.y + offsetY, block.color);
        })

        var isCollision = nextStepTetriminoBlocks.some(
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
    /* end-test-code */

    ns.Logic = Logic;

})(this.dippejs)
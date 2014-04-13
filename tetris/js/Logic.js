this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     * stateless static class
     * @type {{}}
     */
    var Logic = {};

    Logic.matrixAfterRemoveFullLines = function (matrixBlocks, matrixWidth) {
        var lines = [];
        var tmpMatrixBlocks = matrixBlocks.slice(0);
        for (var i = 0; i < ns.Main.MATRIX_HEIGHT; i++) {
            lines[i] = 0
        }

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
                tmpMatrixBlocks.forEach(function (block) {
                    if (block.y < line) {
                        block.y = block.y + 1;
                    }
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

        var data = {
            tetriminoBlocks: tetriminoBlocks,
            matrixBlocks: matrixBlocks,
            matrixHeight: matrixHeight,
            matrixWidth: matrixWidth
        }

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
        return block.y > (matrixHeight - 1);
    }

    function _isOnMatrixSideCollision(block, matrixWidth) {
        return (block.x < 0) || (block.x > (matrixWidth - 1));
    }


    /* test-code */
    Logic.__testonly__ = {};
    Logic.__testonly__._isBlockCollision = _isBlockCollision;
    Logic.__testonly__._isOnMatrixEndCollision = _isOnMatrixEndCollision;
    Logic.__testonly__._isOnMatrixSideCollision = _isOnMatrixSideCollision;
    /* end-test-code */

    ns.Logic = Logic;

})(this.dippejs)
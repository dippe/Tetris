this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     * stateless static class
     * @type {{}}
     */
    var Logic = {};

    Logic.isLineFull = function () {
        // TODO implement
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
        return block.y > (matrixHeight);
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
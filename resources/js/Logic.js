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


    // TODO refactor this
    Logic.isNextStepCollision = function (matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, offsetX, offsetY) {
        var nextStepTetriminoBlocks = tetriminoBlocks;
        // todo replace with array.clone?
        tetriminoBlocks.forEach(function (block) {
            nextStepTetriminoBlocks.push(new ns.MatrixBlock(block.x + offsetX, block.y + offsetY, block.color));
        })

        try {
            nextStepTetriminoBlocks.forEach(
                function (tetriminoBlock) {
                    if (_isOnMatrixEndCollision(tetriminoBlock, matrixHeight)) {
                        throw "Matrix bottom collision";
                    }

                    if (_isOnMatrixSideCollision(tetriminoBlock, matrixWidth)) {
                        throw "Matrix side collision";
                    }

                    matrixBlocks.forEach(
                        function (matrixBlock) {
                            if (_isCollision(matrixBlock, tetriminoBlock)) {
                                throw "Collision";
                            }
                        }
                    );
                }
            );
            return false;
        } catch (e) {
            return true;
        }

    }

    function _isCollision(blockA, blockB) {
        return (blockA.x === blockB.x) && (blockA.y === blockB.y);
    }

    function _isOnMatrixEndCollision(block, matrixHeight) {
        return block.y >= (matrixHeight);
    }

    function _isOnMatrixSideCollision(block, matrixWidth) {
        return (block.x < 0) || (block.x >= (matrixWidth));
    }


    ns.Logic = Logic;

})(this.dippejs)
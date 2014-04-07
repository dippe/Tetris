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


    Logic.isNextStepCollision = function(matrixBlocks, tetriminoBlocks, matrixHeight)
    {
        var nextStepTetriminoBlocks = [];
        tetriminoBlocks.forEach(function(block){
            nextStepTetriminoBlocks.push(new ns.MatrixBlock(block.x, block.y+1, block.color));
        })

        try {
            nextStepTetriminoBlocks.forEach(
                function (tetriminoBlock) {
                    if (_isOnMatrixEnd(tetriminoBlock, matrixHeight)) {
                        throw "Matrix bottom collision";
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
        } catch (e){
            return true;
        }

    }

    function _isCollision(blockA, blockB) {
        return (blockA.x == blockB.x) && (blockA.y == blockB.y);
    }

    function _isOnMatrixEnd(block, matrixHeight){
        return block.y > matrixHeight;
    }


    ns.Logic = Logic;

})(this.dippejs)
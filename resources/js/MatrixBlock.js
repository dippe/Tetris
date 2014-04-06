this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     *   Smallest not empty piece of the matrix = matrix block
     */
    function MatrixBlock(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    var p = MatrixBlock.prototype = {};
    p.constructor = MatrixBlock;

    /**
     *   Prototype methods
     */

    ns.MatrixBlock = MatrixBlock;

})(this.dippejs)
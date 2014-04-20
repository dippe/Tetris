this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var SIZE = 4;

    // hexa representation
    var TETRIMINOS = [
        { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
        { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
        { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
        { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
        { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
        { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
        { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
    ]

    function Tetrimino(num, rotation, offsetX, offsetY) {
        this._num = num;
        this._rotation = rotation;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        Object.freeze(this);    // make immutable
    }


    // static method
    Tetrimino.getRandomTetrimino = function () {
        var rndNum = Math.floor(Math.random() * (TETRIMINOS.length));
        var rndRotate = Math.floor(Math.random() * 4);
        var tetrimino = new Tetrimino(rndNum, rndRotate, 0, 0);

        return tetrimino;
    }

    /**
     *   Prototype methods
     */


    var p = Tetrimino.prototype = {};
    p.constructor = Tetrimino;

    p.getAsMatrixBlockArr = function () {
        // TODO cache this
        return this._getTetriminoAsMatrixBlockArr(this._num, this._rotation, this._offsetX, this._offsetY);
    }

    p.afterRotateLeft = function () {
        var rotation = this._rotation > 0 ? this._rotation - 1 : 3;
        return new Tetrimino(this._num, rotation, this._offsetX, this._offsetY);
    }

    p.afterRotateRight = function () {
        var rotation = this._rotation < 3 ? this._rotation + 1 : 0;
        return new Tetrimino(this._num, rotation, this._offsetX, this._offsetY);
    }

    p.afterMoveDown = function () {
        return new Tetrimino(this._num, this._rotation, this._offsetX, this._offsetY + 1);
    }

    p.afterMoveLeft = function () {
        return new Tetrimino(this._num, this._rotation, this._offsetX - 1, this._offsetY);
    }

    p.afterMoveRight = function () {
        return new Tetrimino(this._num, this._rotation, this._offsetX + 1, this._offsetY);
    }


    /**
     * get the Hexa(binary) representation and converts to MatrixBlock array
     * num: number of Tetrimino
     * rotation: 0-3
     */
    p._getTetriminoAsMatrixBlockArr = function (num, rotation, offsetX, offsetY) {
        if (num >= TETRIMINOS.length) {
            throw "Invalid _num:" + num;
        }

        var matrixBlockArr = [];
        var tmpMatrixBlock;
        var tetrimino = TETRIMINOS[num];
        var hexa = tetrimino.blocks[rotation];
        var color = tetrimino.color;

        applyOnHexa(hexa, SIZE, bitToArr);

        return matrixBlockArr;

        function bitToArr(x, y, bit) {
            if (bit === 1) {
                tmpMatrixBlock = new ns.MatrixBlock(x + offsetX, y + offsetY, color);
                matrixBlockArr.push(tmpMatrixBlock);
            }
        }
    }

    /**
     *   Closure private
     */

    // FIXME: it's inverted now
    var applyOnHexa = function (hexa, size, func) {
        var tmpHexa = hexa;
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var bit = tmpHexa & 1;
                func(x, y, bit);
                tmpHexa = tmpHexa >> 1;
            }
        }
    }


    ns.Tetrimino = Tetrimino;

})(dippejs)
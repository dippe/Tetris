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

    function Tetrimino(num, rotation) {
        this._num = num;
        this._rotation = rotation;
        this._offsetX = 0;
        this._offsetY = 0;
    }


    // static method
    Tetrimino.getRandomTetrimino = function () {
        var rndNum = Math.floor(Math.random() * (TETRIMINOS.length));
        var rndRotate = Math.floor(Math.random() * 4);

        return new Tetrimino(rndNum, rndRotate);
    }


    var p = Tetrimino.prototype = {};
    p.constructor = Tetrimino;

    /**
     *   Prototype methods
     */

    p.getAsMatrixBlockArr = function () {
        // TODO cache this
        return this._getTetriminoAsMatrixBlockArr(this._num, this._rotation, this._offsetX, this._offsetY);
    }

    p.rotateLeft = function () {
        this._rotation = this._rotation > 0 ? this._rotation - 1 : 3;
    }

    p.rotateRight = function () {
        this._rotation = this._rotation < 3 ? this._rotation + 1 : 0;
    }

    p.moveDown = function () {
        this._offsetY++;
    }

    p.moveLeft = function () {
        this._offsetX--;
    }

    p.moveRight = function () {
        this._offsetX++;
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

        applyOnHexa(hexa, bitToArr);

        return matrixBlockArr;

        function bitToArr(x, y, bit) {
            if (bit === 1) {
                tmpMatrixBlock = new ns.MatrixBlock(x + offsetX, y + offsetY, color);
                matrixBlockArr.push(tmpMatrixBlock);
            }
        }
    }


    // FIXME: it's inverted now
    /*    p.convertHexaToArray = function(hexa){
     var tmp = hexa;
     var retArr = [];
     for(var i=0; i<SIZE; i++){
     retArr[i] = [];
     var tmpStr = '';

     for(var j=0; j<SIZE; j++){
     var bit = tmp & 1;
     retArr[i][j] = bit;
     tmp = tmp >> 1;
     tmpStr += bit;
     }
     console.log('\n' + tmpStr);
     }
     return retArr;
     }*/


    /**
     *   Closure private
     */

    // FIXME: it's inverted now
    var applyOnHexa = function (hexa, func) {
        var tmpHexa = hexa;
        for (var x = 0; x < SIZE; x++) {
            for (var y = 0; y < SIZE; y++) {
                var bit = tmpHexa & 1;
                func(x, y, bit);
                tmpHexa = tmpHexa >> 1;
            }
        }
    }


    ns.Tetrimino = Tetrimino;

})(dippejs)
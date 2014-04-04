this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    var SIZE = 4;

    var TETRIMINOS = [
        { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
        { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
        { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
        { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
        { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
        { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
        { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
    ]

    function Tetrimino(){
    }

    var p = Tetrimino.prototype = {};
    p.constructor = Tetrimino;

    /**
    *   Prototype methods
    */

    p.getTetrimino = function(num){
        if(num >= TETRIMINOS.length){
            throw "Invalid num:" + num;
        }
        return TETRIMINOS[num];
    }

    p.getTetriminoCount = function(){
        return TETRIMINOS.length;
    }


    // FIXME: it's inverted now
    p.convertHexaToArray = function(hexa){
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
    }


    /**
    *   Closure private
    */



    ns.Tetrimino = new Tetrimino();
    
})(dippejs)
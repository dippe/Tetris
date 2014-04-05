this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    var FPS = 22;
    var DRAW_TYPE = ns.Const.DrawType.TABLE;
    var MATRIX_CSSID = 'matrixArea';
    var MATRIX_WIDTH = 10;
    var MATRIX_HEIGHT = 20;

    var Main = {};

    Main.ticker = null;
    Main.draw = null;

    Main.init = function(){
        this._initTicker();
        this._initWindowEvents();
        this._initDraw();
        this.reStartGame();
    }

    Main.reStartGame = function(){
        var tmp, tmpArr;
        var count = ns.Tetrimino.getTetriminoCount();
        for (var i=0; i<count; i++){
            tmp = ns.Tetrimino.getTetrimino(i);
            for(var rotate=0; rotate<4; rotate++){
                ns.Tetrimino.convertHexaToArray(tmp.blocks[rotate]);
                console.log('\n .....');

                tmpArr = ns.Tetrimino.getTetriminoAsMatrixBlockArr(i, rotate);

            }
            console.log('\n ----');
        }

        tmpArr = ns.Tetrimino.getTetriminoAsMatrixBlockArr(1, 2);
        this.draw.drawMatrixBlocks(tmpArr);

    }

    Main._initDraw = function(){
        this.draw = new ns.Draw(MATRIX_CSSID, DRAW_TYPE);
        this.draw.init(MATRIX_WIDTH, MATRIX_HEIGHT);
    }

    Main._initTicker = function(){
        var ticker = ns.Ticker;
        ticker.init(FPS);
        ticker.start();
        this.ticker = ticker;
    }

    Main._initWindowEvents = function(){
        window.onbeforeunload = function(){
            dippejs.Ticker.stop();
        }
        window.onfocus = function(){
            dippejs.Ticker.start();
        }
    }

    ns.Main = Main;
    
})(dippejs)
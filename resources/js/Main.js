this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    var FPS = 1;
    var DRAW_TYPE = ns.Const.DrawType.TABLE;
    var MATRIX_CSSID = 'matrixArea';
    var MATRIX_WIDTH = 10;
    var MATRIX_HEIGHT = 20;

    var Main = {};

    Main.tickerTest = null;
    Main.tickerMove = null;
    Main.draw = null;
    Main.matrixBlockArr = null;

    Main.init = function(){
        this._initWindowEvents();
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

        this.matrixBlockArr = ns.Tetrimino.getTetriminoAsMatrixBlockArr(1, 2);

        this._initDraw();
        this._initTestTicker();
        this._initMoveTicker();

    }

    Main._initDraw = function(){
        // fixme - destroy if exists
        this.draw = new ns.Draw(MATRIX_CSSID, DRAW_TYPE);
        this.draw.init(MATRIX_WIDTH, MATRIX_HEIGHT);
    }

    Main._initTestTicker = function(){
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var color = 0xffffff;
        this.tickerTest = ticker;
        ticker.init(2, callback);
        ticker.start();

//        callback test:
        function callback() {
            color --;
            document.querySelector('body').style.background = '#' + color.toString(16);
            //console.log(color);
        }

    }

    Main._initMoveTicker = function(){
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var draw = this.draw;
        var matrixBlockArr = this.matrixBlockArr;
        ticker.init(FPS, callback);
        ticker.start();
        this.tickerMove = ticker;


//        callback test:
        function callback() {
            this;
            draw.drawMatrixBlocks(matrixBlockArr);
            draw.clear();
        }

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
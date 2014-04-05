this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    var FPS = 1;
    var DEFAULT_DRAW_TYPE = ns.Const.DrawType.TABLE_CHAR;
    var MATRIX_CSSID = 'matrixArea';
    var MATRIX_WIDTH = 10;
    var MATRIX_HEIGHT = 20;

    var Main = {};

    Main.tickerTest = null;
    Main.tickerMove = null;
    Main.drawer = null;
    Main.matrixBlockArr = [];

    Main.init = function(){
        this._initWindowEvents();
        this.reStartGame();
    }

    Main.reStartGame = function(){
        var tmp, tmpArr;
        var rndNum = Math.floor( Math.random()*(ns.Tetrimino.getTetriminoCount()) );
        var rndRotate = Math.floor(Math.random()*4 );

        this.activeTetrimino = new ns.Tetrimino(rndNum, rndRotate);

        this._initDraw();
        this._initTestColorTicker();
        this._initMoveTicker();

    }

    Main._initDraw = function(){
        // fixme - destroy if exists
        this.drawer = new ns.Draw(MATRIX_CSSID, DEFAULT_DRAW_TYPE);
        this.drawer.init(MATRIX_WIDTH, MATRIX_HEIGHT);
    }

    // bg color changer test
    Main._initTestColorTicker = function(){
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var color = 0xffffff;
        this.tickerTest = ticker;
        ticker.init(2, callback);
        //ticker.start();

//        callback test:
        function callback() {
            color --;
            document.querySelector('body').style.background = '#' + color.toString(16);
            //console.log(color);
        }

    }

    // Matrix Block move + draw
    Main._initMoveTicker = function(){
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var draw = ns.Main.drawer;
        var matrixBlockArr = this.matrixBlockArr;
        var tetrimino = this.activeTetrimino;
        ticker.init(FPS, callback);
        ticker.start();
        this.tickerMove = ticker;

//        callback test:
        function callback() {
            // test movement + rotation
            tetrimino.moveDown();
            tetrimino.rotateLeft();
            var tetriminoBlockArr = tetrimino.getAsMatrixBlockArr();

            draw.clear();
            // draw the table with fixed elements
            draw.drawMatrixBlocks(matrixBlockArr);
            // draw the active tetrimino
            draw.drawMatrixBlocks(tetriminoBlockArr);
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
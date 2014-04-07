this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var FPS = 1;
    var DEFAULT_DRAW_TYPE = ns.Const.DrawType.TABLE_CHAR;
    var MATRIX_CSSID = 'matrixArea';
    var MATRIX_WIDTH = 10;
    var MATRIX_HEIGHT = 10;

    var Main = {};

    Main.tickerTest = null;
    Main.tickerMove = null;
    Main.drawer = null;
    Main.matrixBlockArr = [];

    Main.init = function () {
        this.reStartGame();
        this._initWindowEvents();
    }

    Main.reStartGame = function () {
        var tmp, tmpArr;

        this.activeTetrimino = new ns.Tetrimino.getRandomTetrimino();

        this._initDraw();
        this._initTestColorTicker();
        this._initMoveTicker();

    }

    Main._initDraw = function () {
        // fixme - destroy if exists
        this.drawer = new ns.Draw(MATRIX_CSSID, DEFAULT_DRAW_TYPE);
        this.drawer.init(MATRIX_WIDTH, MATRIX_HEIGHT);
    }

    // bg color changer test
    Main._initTestColorTicker = function () {
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var color = 0xffffff;
        this.tickerTest = ticker;
        ticker.init(2, callback);
        //ticker.start();

//        callback test:
        function callback() {
            color--;
            document.querySelector('body').style.background = '#' + color.toString(16);
            //console.log(color);
        }

    }

    // Matrix Block move + draw
    Main._initMoveTicker = function () {
        // fixme - destroy if exists
        var ticker = new ns.Ticker();
        var draw = ns.Main.drawer;
        var matrixBlocks = this.matrixBlockArr;
        var tetrimino = this.activeTetrimino;
        ticker.init(FPS, callback.bind(this));
        ticker.start();
        this.tickerMove = ticker;

//        callback test:
        function callback() {

            var tetriminoBlocks = tetrimino.getAsMatrixBlockArr();
            if ( ns.Logic.isNextStepCollision(matrixBlocks, tetriminoBlocks, MATRIX_HEIGHT)){
                matrixBlocks = matrixBlocks.concat(tetriminoBlocks);
                tetrimino = ns.Tetrimino.getRandomTetrimino();
            }else{
                // test movement + rotation
                tetrimino.moveDown();
              //  tetrimino.rotateLeft();
            }

            draw.clear();
            // draw the table with fixed elements
            draw.drawMatrixBlocks(matrixBlocks);
            // draw the active tetrimino
            draw.drawMatrixBlocks(tetriminoBlocks);
        }

    }


    Main._initWindowEvents = function () {
        var tickerMove = this.tickerMove;
        var tickerTest = this.tickerTest;
        window.onunload = window.onbeforeunload = function () {
            tickerMove.stop();
            tickerTest.stop();
        }
        window.onfocus = function () {
            tickerMove.start();
            tickerTest.start();
        }
    }

    ns.Main = Main;

})(this.dippejs)
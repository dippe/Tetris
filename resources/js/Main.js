this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var DEFAULT_DRAW_TYPE = ns.Const.DrawType.TABLE_CHAR;
    var MATRIX_CSSID = 'matrixArea';
    var Main = {};

    Main.FPS = 2;
    Main.MATRIX_WIDTH = 10;
    Main.MATRIX_HEIGHT = 15;

    Main.tickerTest = new ns.Ticker();
    Main.tickerMove = new ns.Ticker();
    Main.drawer = null;
    Main.matrixBlocks = [];

    Main.init = function () {
        ns.InputWrapper.init();
        this.reStartGame();
        this._initWindowEvents();
    }

    Main.reStartGame = function () {
        var tmp, tmpArr;

        this.activeTetrimino = new ns.Tetrimino.getRandomTetrimino();

        this._initDraw();
        this._initTestColorTicker(this.tickerTest);
        ns.Logic._initMoveTicker(this.tickerMove);

    }

    Main._initDraw = function () {
        // fixme - destroy if exists
        this.drawer = new ns.Draw(MATRIX_CSSID, DEFAULT_DRAW_TYPE);
        this.drawer.init(ns.Main.MATRIX_WIDTH, ns.Main.MATRIX_HEIGHT);

        // todo remove after testing phase
        this.drawerTest = new ns.Draw(MATRIX_CSSID + "Test", ns.Const.DrawType.TABLE_CSS);
        this.drawerTest.init(ns.Main.MATRIX_WIDTH, ns.Main.MATRIX_HEIGHT);
    }

    // bg color changer test
    Main._initTestColorTicker = function (ticker) {
        // fixme - destroy if exists
        var color = 0xffffff;
        ticker.init(2, callback);
        //ticker.start();

//        callback test:
        function callback() {
            color--;
            document.querySelector('body').style.background = '#' + color.toString(16);
            //console.log(color);
        }

    }

    Main.reDraw = function () {
        var tetriminoBlocks = ns.Main.activeTetrimino.getAsMatrixBlockArr();
        var matrixBlocks = ns.Main.matrixBlocks;

        ns.Main.drawer.clear()
            .drawMatrixBlocks(matrixBlocks)
            .drawMatrixBlocks(tetriminoBlocks);

        // Todo remove after testing phase
        ns.Main.drawerTest.clear()
            .drawMatrixBlocks(matrixBlocks)
            .drawMatrixBlocks(tetriminoBlocks);

    }

    Main._initWindowEvents = function () {
        var tickerMove = this.tickerMove;
        var tickerTest = this.tickerTest;
        window.onbeforeunload = function (event) {
            event.preventDefault();
            tickerMove.stop();
            tickerTest.stop();
        }
        window.onfocus = function () {
            event.preventDefault();
            tickerMove.start();
            tickerTest.start();
        }
    }

    Main._gameOver = function () {
        this.tickerMove.stop();
        this.tickerTest.stop();
        this.reDraw();
        alert("game over");
    }

    ns.Main = Main;

})(this.dippejs)
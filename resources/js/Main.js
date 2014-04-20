this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var Main = {};

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
        this._initMoveTicker(this.tickerMove);

    }

    Main._initDraw = function () {
        // fixme - destroy if exists
        this.drawer = new ns.Draw(ns.Const.Main.MATRIX_CSSID, ns.Const.DrawType.DEFAULT_DRAW_TYPE);
        this.drawer.init(ns.Const.Main.MATRIX_WIDTH, ns.Const.Main.MATRIX_HEIGHT);

        // todo remove after testing phase
        this.drawerTest = new ns.Draw(ns.Const.Main.MATRIX_CSSID + "Test", ns.Const.DrawType.TABLE_CHAR);
        this.drawerTest.init(ns.Const.Main.MATRIX_WIDTH, ns.Const.Main.MATRIX_HEIGHT);
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

    // Matrix Block move + draw
    Main._initMoveTicker = function (ticker) {
        var m = ns.Main;
        var callback = ns.Logic.tickerCallback;

        ticker.init(ns.Const.Main.FPS, callback.bind(m, ns.Const.Main.MATRIX_HEIGHT, ns.Const.Main.MATRIX_WIDTH));
        ticker.start();

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
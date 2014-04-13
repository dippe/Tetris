this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var FPS = 2;
    var DEFAULT_DRAW_TYPE = ns.Const.DrawType.TABLE_CHAR;
    var MATRIX_CSSID = 'matrixArea';

    var Main = {};

    Main.MATRIX_WIDTH = 10;
    Main.MATRIX_HEIGHT = 10;

    Main.tickerTest = null;
    Main.tickerMove = null;
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
        this._initTestColorTicker();
        this._initMoveTicker();

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
        var m = ns.Main;
        ticker.init(FPS, callback.bind(this));
        ticker.start();
        this.tickerMove = ticker;

//        callback test:
        function callback() {
            var tetriminoBlocks = m.activeTetrimino.getAsMatrixBlockArr();

            if (ns.Logic.isNextStepCollision(m.matrixBlocks, tetriminoBlocks, m.MATRIX_HEIGHT, m.MATRIX_WIDTH, 0, 1)) {
                m.matrixBlocks = m.matrixBlocks.concat(tetriminoBlocks);
                m.activeTetrimino = ns.Tetrimino.getRandomTetrimino();
                if (ns.Logic.isNextStepCollision(m.matrixBlocks, m.activeTetrimino.getAsMatrixBlockArr(), m.MATRIX_HEIGHT, m.MATRIX_WIDTH, 0, 1)) {
                    this._gameOver();
                }
            } else {
                m.activeTetrimino = m.activeTetrimino.afterMoveDown();
            }

            m.reDraw();
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
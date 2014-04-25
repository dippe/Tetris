this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var Main = {};

    Main.tickerTest = new ns.Ticker();
    Main.tickerMove = new ns.Ticker();
    Main.drawer = null;

    Main.init = function () {
        ns.InputWrapper.init();
        this.reStartGame();
        this._initWindowEvents();
        this._initMenu();
    }

    Main.reStartGame = function () {
        var tmp, tmpArr;

        this._initDraw();
        ns.Logic.init(this.drawer.reDraw);
        this._initTestColorTicker(this.tickerTest);
        this._initMoveTicker(this.tickerMove);

    }

    Main._initDraw = function () {
        var c = ns.Const;
        this.drawer = new ns.Draw(c.Main.MATRIX_CSSID, c.DrawType.TABLE_CSS, c.Main.MATRIX_WIDTH, c.Main.MATRIX_HEIGHT);
        this.drawer.init();
    }

    Main._initMenu = function () {

        ns.Menu.init(ns.Const.Main.MENU_CSSID);

        ns.Menu.redraw();

        ns.Menu.show();

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

        ticker.init(ns.Const.Main.FPS, ns.Logic.tickerCallback.bind(ns.Logic, ns.Const.Main.MATRIX_HEIGHT, ns.Const.Main.MATRIX_WIDTH));
        ticker.start();

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

    Main.gameOver = function () {
        this.tickerMove.stop();
        this.tickerTest.stop();
        document.getElementById(ns.Const.Main.MATRIX_CSSID).innerHTML = "game over";
    }

    ns.Main = Main;

})(this.dippejs)
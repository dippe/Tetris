this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    var FPS = 22;


    function Main(){
    }
    
    var p = Main.prototype = {};
    p.constructor = Main;
    
    /**
    *   Prototype methods
    */

    p.init = function(){
        _initTicker();
        _initWindowEvents();
        this.startGame();
    }

    p.startGame = function(){
        for (var i=0; i<ns.Tetrimino.getTetriminoCount(); i++){
            var tmp = ns.Tetrimino.getTetrimino(i);
            for(var rotate=0; rotate<4; rotate++){
                ns.Tetrimino.convertHexaToArray(tmp.blocks[rotate]);
                console.log('\n .....');
            }
            console.log('\n ----');
        }
    }


    var _initTicker = function(){
        var ticker = dippejs.Ticker;
        ticker.init(FPS);
        ticker.start();
    }

    var _initWindowEvents = function(){
        window.onbeforeunload = function(){
            dippejs.Ticker.stop();
        }
        window.onfocus = function(){
            dippejs.Ticker.start();
        }
    }


    /**
    *   Closure private
    */
    
    
    ns.Main = new Main();
    
})(dippejs)
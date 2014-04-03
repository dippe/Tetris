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
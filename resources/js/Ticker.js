
this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    /**
    *   Generate ticker
    */

    function Ticker(){}

    var p = Ticker.prototype = {};
    p.constructor = Ticker;

    /**
    *   Prototype methods
    */

    p.init = function(fps, callback){
        if(!ns.Common.isNumber(fps) || fps <= 0){
            throw "Invalid Ticker init number";
        }

        this.fps = fps;
        this.callback = callback;
        this.timeMs = 1/fps*1000;
        this.timer = null;

        this.start();
    };

    p.start = function(){
        this.timer = setInterval(this.callback, this.timeMs);
    }

    p.stop = function(){
        clearInterval(this.timer);
    }
    
    ns.Ticker = Ticker;
    
})(dippejs)
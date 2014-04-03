
this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    /**
    *   Generate ticker event
    */

    function Ticker(){}

    var p = Ticker.prototype = {};
    p.constructor = Ticker;

    /**
    *   Prototype methods
    */

    p.init = function(fps){
        if(!ns.Common.isNumber(fps) || fps < 1){
            throw "Invalid Ticker init number";
        }

        var counter = 0;
        this.fps = fps;
        this.callback = function(){counter++; if (counter%111 == 0) {console.log('a')}};
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

    /**
    *   Closure private
    */
    
    
    ns.Ticker = new Ticker();
    
})(dippejs)
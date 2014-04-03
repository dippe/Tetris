(function(ns) {
    'use strict';

    /**
    *   Generate ticker event
    *   Default 20/sec
    */

    function Ticker(tickPerSec){
        if(tickPerSec == undefined || tickPerSec*1 == NaN || tickPerSec < 1 )
        this.tickPerSec =  tickPerSec;
    }

    var p = Ticker.prototype = {};
    p.constructor = Ticker;

    p.setTicker = function(tickPerSec){

    }

    /**
    *   Prototype methods
    */
    
    /**
    *   Closure private
    */
    
    
    fn.Ticker = new Ticker();
    
})(dippe)
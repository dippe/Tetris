this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    function Common(){
    }
    
    var p = Common.prototype = {};
    p.constructor = Common;
    
    /**
    *   Prototype methods
    */

    p.isNumber = function(n){
        return (!isNaN(parseFloat(n)) && isFinite(n));
    }
    
    /**
    *   Closure private
    */
    
    
    ns.Common = new Common();
    
})(dippejs)
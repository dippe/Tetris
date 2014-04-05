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

    p.validateObjType = function(obj, type){
        if ( ! (obj instanceof type) ) {
            throw "validation error: obj is not instance of " + type;
        }
    }
    
    /**
    *   Closure private
    */
    
    
    ns.Common = new Common();
    
})(dippejs)
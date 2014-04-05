this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    function Draw(cssId, drawType){
        // initialize drawing functions
        this._initFunc('init', drawType);
        this._initFunc('drawMatrixBlocks', drawType);
        this._initFunc('clear', drawType);
        this.cssId = cssId;
    }
    
    var p = Draw.prototype = {};
    p.constructor = Draw;

    /**
    *   Prototype methods
    */


    /**
    *   Should be initialized in constructor
    */

    p.init = function(width, height){ throw 'not initialized';}

    p.drawMatrixBlocks =  function(matrixBlockArr){ throw 'not initialized';};

    p.clear =  function(){ throw 'not initialized';};


    // function initializer
    p._initFunc = function(funcName, drawType){
        var anchestorFuncName = '__' + drawType + '_' + funcName;
        this[funcName] = this[anchestorFuncName];
    }

    ns.Draw = Draw;

})(dippejs)
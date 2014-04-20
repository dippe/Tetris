this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    function Draw(cssId, drawType, width, height) {
        // initialize drawing functions
        var clearFunc = this[_getFuncName('clear', drawType)];
        var initFunc = this[_getFuncName('init', drawType)];
        var drawFunc = this[_getFuncName('drawMatrixBlocks', drawType)];

        this.reDraw = _getRedrawFunc(cssId, clearFunc, drawFunc);
        this.init = _getInitFunc(cssId, width, height, initFunc);

        Object.freeze(Draw);
    }


    /**
     *   Prototype methods
     */

    var p = Draw.prototype = {};
    p.constructor = Draw;

    p.init = null;
    p.reDraw = null;


    /**
     *   Private methods
     */

    function _getRedrawFunc(cssId, clearFunc, drawFunc) {
        return function (matrixBlockArr) {
            clearFunc(cssId);
            drawFunc(cssId, matrixBlockArr);
        }
    }

    function _getInitFunc(cssId, width, height, initFunc) {
        return function () {
            initFunc(cssId, width, height);
        }
    }


    function _getFuncName(funcName, drawType) {
        var anchestorFuncName = '__' + drawType + '_' + funcName;
        return anchestorFuncName;
    }

    ns.Draw = Draw;

})(dippejs)
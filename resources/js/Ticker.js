this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    /**
     *   Generate ticker
     */

    function Ticker() {
        this._fps = null;
        this._callback = null;
        this._timeMs = null;
        this._timer = null;
    }

    var p = Ticker.prototype = {};
    p.constructor = Ticker;

    /**
     *   Prototype methods
     */

    p.init = function (fps, callback) {
        if (!ns.Common.isNumber(fps) || fps <= 0) {
            throw "Invalid Ticker init number";
        }

        this._fps = fps;
        this._callback = callback;
        this._timeMs = 1 / fps * 1000;
        this._timer = null;
    };

    p.start = function () {
        if (this._timer === null) {
            this._timer = setInterval(this._callback, this._timeMs);
        }
    }

    p.stop = function () {
        clearInterval(this._timer);
    }

    ns.Ticker = Ticker;

})(dippejs)
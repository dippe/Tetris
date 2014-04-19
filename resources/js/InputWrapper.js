this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    function InputWrapper() {
    }

    var p = InputWrapper.prototype = {};
    p.constructor = InputWrapper;

    /**
     *   Prototype methods
     */

    p.init = function () {
        this._initWindowEvents();
    }

    p._initWindowEvents = function () {
        window.onkeydown = _onKeyDownHandler;
        window.onkeyup = _onKeyUpHandler;
        window.onkeypress = _onKeyPressHandler;
    }

    /**
     *   Closure private
     */

    var _onKeyDownHandler = function (event) {
        event.preventDefault();

        // TODO: replace direct calls with event handler!!

        switch (event.keyCode) {
            case 38:    //up
                ns.Logic.rotateLeft();
                break;
            case 40:    // down
                ns.Logic.rotateRight();
                break;
            case 37:    // left
                ns.Logic.moveLeft();
                break;
            case 39:    // right
                ns.Logic.moveRight();
                break;
            case 32:    // space
                ns.Logic.moveDown();
                break;
            case 13:    // enter
                ns.Logic.moveUp();
                break;
            default:
                console.log(event.keyCode);
                break;
        }

    }

    var _onKeyUpHandler = function (event) {

    }

    var _onKeyPressHandler = function (event) {

    }


    ns.InputWrapper = new InputWrapper();

})(this.dippejs)
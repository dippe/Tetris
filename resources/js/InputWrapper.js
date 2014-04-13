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


    p.moveLeft = function () {
        console.log("left");
        // TODO: replace direct calls with event handler!!
        var processed = ns.Main.activeTetrimino.afterMoveLeft();
        this._process(processed);
    }

    p.moveRight = function () {
        console.log("right");
        // TODO: replace direct calls with event handler!!
        var processed = ns.Main.activeTetrimino.afterMoveRight();
        this._process(processed);
    }

    p.moveUp = function () {
        console.log("up");
        // TODO: replace direct calls with event handler!!
        throw "not implemented yet";
    }

    p.rotateRight = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        var processed = ns.Main.activeTetrimino.afterRotateRight();
        this._process(processed);
    }

    p.rotateLeft = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        var processed = ns.Main.activeTetrimino.afterRotateLeft();
        this._process(processed);

    }

    p.moveDown = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        var m = ns.Main;
        var tetriminoBlocks = m.activeTetrimino.getAsMatrixBlockArr();

        if (!ns.Logic.isNextStepCollision(m.matrixBlocks, tetriminoBlocks, m.MATRIX_HEIGHT, m.MATRIX_WIDTH, 0, 1)) {
            m.activeTetrimino = m.activeTetrimino.afterMoveDown();
            m.reDraw();
        }
    }


    p._process = function (processed) {
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, processed.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 0, 0)) {
            ns.Main.activeTetrimino = processed;
            ns.Main.reDraw();
        }
    }

    /**
     *   Closure private
     */

    var _onKeyDownHandler = function (event) {
        event.preventDefault();

        // TODO: replace direct calls with event handler!!

        switch (event.keyCode) {
            case 38:    //up
                ns.InputWrapper.rotateLeft();
                break;
            case 40:    // down
                ns.InputWrapper.rotateRight();
                break;
            case 37:    // left
                ns.InputWrapper.moveLeft();
                break;
            case 39:    // right
                ns.InputWrapper.moveRight();
                break;
            case 32:    // space
                ns.InputWrapper.moveDown();
                break;
            case 13:    // enter
                ns.InputWrapper.moveUp();
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
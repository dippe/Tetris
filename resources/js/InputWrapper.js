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


    p.leftMove = function () {
        console.log("left");
        // TODO: replace direct calls with event handler!!
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, -1, 0)) {
            ns.Main.activeTetrimino.moveLeft();
            ns.Main.reDraw();
        }
    }

    p.rightMove = function () {
        console.log("right");
        // TODO: replace direct calls with event handler!!
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 1, 0)) {
            ns.Main.activeTetrimino.moveRight();
            ns.Main.reDraw();
        }
    }

    p.upMove = function () {
        console.log("up");
        // TODO: replace direct calls with event handler!!
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 0, -1)) {
            ns.Main.activeTetrimino.rotateLeft();
            ns.Main.reDraw();
        }
    }

    p.rotateRight = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        // TODO check rotation collision
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 0, 0)) {
            ns.Main.activeTetrimino.rotateRight();
            ns.Main.reDraw();
        }
    }

    p.rotateLeft = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        // TODO check rotation collision
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 0, 0)) {
            ns.Main.activeTetrimino.rotateLeft();
            ns.Main.reDraw();
        }
    }

    p.downMove = function () {
        console.log("down");
        // TODO: replace direct calls with event handler!!
        if (!ns.Logic.isNextStepCollision(ns.Main.matrixBlocks, ns.Main.activeTetrimino.getAsMatrixBlockArr(), ns.Main.MATRIX_HEIGHT, ns.Main.MATRIX_WIDTH, 1, 0)) {
            ns.Main.activeTetrimino.moveDown();
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
                ns.InputWrapper.leftMove();
                break;
            case 39:    // right
                ns.InputWrapper.rightMove();
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
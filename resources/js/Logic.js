this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    function Logic(){
    }
    
    var p = Logic.prototype = {};
    p.constructor = Logic;
    
    /**
    *   Prototype methods
    */


    p.init = function(width, height){
        this.tetriminoNum = null;
        this.tetriminoRotation = null;
        this.tetriminoX = null;
        this.tetriminoY = null;
        this.tetriminoSize = null;

        this.boardContent = [];
        this.boardWidth = width;
        this.boardHeight = height;
    }

    p.loadTetrimino = function(tetriminoNum){
        this.tetriminoSize = 4;
    }

    p.rotateLeft = function(){
        this.tetriminoRotation = this.tetriminoRotation > 1 ? this.tetriminoRotation-- : this.tetriminoSize;
    }

    p.moveDown = function(){
        this.tetriminoY--;
    }

    p.moveLeft = function(){
        this.tetriminoX--;
    }

    p.moveRight = function(){
        this.tetriminoX++;
    }


    /**
    *   Prototype private methods
    */

    /**
    *   add to board on collision
    */
    p._addToMatrix = function(tetriminoMatrix, x, y){
        for(i=0; i<tetriminoMatrix; i++){
        }
    }

    p._isXCoordinateInsideMatrix = function(x){
        return (x < this.boardWidth);
    }

    p._eraseLine = function(){
        //for (i=0; i<this.boardContent)
    }

    
    /**
    *   Closure private
    */
    
    
    ns.Logic = new Logic();
    
})(dippejs)
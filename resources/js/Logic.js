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
        this.shapeNum = null;
        this.shapeRotation = null;
        this.shapeX = null;
        this.shapeY = null;
        this.shapeSize = null;

        this.boardContent = [];
        this.boardWidth = width;
        this.boardHeight = height;
    }

    p.loadShape = function(shapeNum){
        this.shapeSize = 4;
    }

    p.rotateLeft = function(){
        this.shapeRotation = this.shapeRotation > 1 ? this.shapeRotation-- : this.shapeSize;
    }

    p.moveDown = function(){
        this.shapeY--;
    }

    p.moveLeft = function(){
        this.shapeX--;
    }

    p.moveRight = function(){
        this.shapeX++;
    }


    /**
    *   Prototype private methods
    */

    /**
    *   add to board on collision
    */
    p._addToBoard = function(shapeMatrix, x, y){
        for(i=0; i<shapeMatrix; i++){
        }
    }

    p._isXCoordinateInsideBoard = function(x){
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
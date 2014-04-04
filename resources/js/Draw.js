this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    function Draw(){
    }
    
    var p = Draw.prototype = {};
    p.constructor = Draw;

    /**
    *   Prototype methods
    */

    p.Types = {
        TABLE : 'Table',
        CONSOLE : 'Console'
    }

    p.init = function(drawType){
        var redrawFuncName = '_redraw' + drawType + 'Func';
        this.redrawMatrix = this[redrawFuncName];
    }


    /**
    *   Should be initialized
    */
    p.drawMatrix = null;



    /*********************
    *
    *   Private methods
    *
    */

    /**
    *   First table draw
    */
    p._initTableFunc = function(matrix){
        for(x=0; x<matrix.length; x++){
            for (y=0; y<matrix[i].length; y++){
                ;
            }
        }
    }

    /**
    *   redraw the table content
    */
    p._redrawTableFunc = function(matrix){
        for(x=0; x<matrix.length; x++){
            for (y=0; y<matrix[i].length; y++){
                ;
            }
        }
    }

    /**
    *   Console drawing for testing
    */
    p._initConsoleFunc = function(matrix){}

    p._redrawConsoleFunc = function(matrix){
        console.log('\n ------------------ ');
        for(x=0; x<matrix.length; x++){
            console.log('\n');
            for (y=0; y<matrix[x].length; y++){
                console.log(matrix[x][y]);
            }
        }
    }

    ns.Draw = new Draw();

})(dippejs)
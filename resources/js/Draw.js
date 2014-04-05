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

    p.init = function(matrix, drawType, cssId){
        var redrawFuncName = '_redraw' + drawType + 'Func';
        var initFuncName = '_init' + drawType + 'Func';
        this.redrawMatrix = this[redrawFuncName];
        this[initFuncName](cssId, matrix);
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
    *   First time table draw
    */
    p._initTableFunc = function(cssId, width, height){
        var rootDiv = document.getElementById(cssId);

        var tableHtml = '<table>';
        for(y=0; y<width; y++){
            tableHtml += '<tr class="mxrow' + y + '">';
            for (x=0; x<height; x++){
                tableHtml += '<td class="mxcol' + x + '"> </td>';
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';

        rootDiv.innerHtml = tableHtml;
    }

    /**
    *   redraw the table content
    */
    p._redrawTableFunc = function(cssId, matrix){
        var selector;
        var isElem;
        var domElem;

        for (y=0; y<matrix.length; y++){
            for(x=0; x<matrix[y].length; x++){
                isElem = (matrix[x][y] & 1) === 1;
                if (isElem){
                    selector = '#' + cssId + ' .mxrow' + y  + ' .mxcol' + x;
                    domElem = document.querySelector(selector);
                    domElem.style.background = matrix[x][y].color;
                }
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
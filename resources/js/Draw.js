this.dippejs = this.dippejs || {};

(function(ns) {
    'use strict';

    function Draw(cssId, drawType){
        // initialize drawing functions
        this._initFunc('init', drawType);
        this._initFunc('drawMatrixBlocks', drawType);
        this._initFunc('', drawType);
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


    // function initializer
    p._initFunc = function(funcName, drawType){
        var anchestorFuncName = '__' + drawType + '_' + funcName;
        this[funcName] = this[anchestorFuncName];
    }

    /*********************
    *
    *   Closure Private methods
    *
    */

    /**
    *   First time table draw
    */
    p.__Table_init = function(width, height){
        var rootDiv = document.getElementById(this.cssId);

        var tableHtml = '<table border="1">';
        for(var y=0; y<height; y++){
            tableHtml += '<tr class="mxrow' + y + '">';
            for (var x=0; x<width; x++){
                tableHtml += '<td class="mxcol' + x + '"> 0 </td>';
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';

        rootDiv.innerHTML = tableHtml;
    }

    /**
    *   redraw the table content
    */
    p.__Table_redraw = function(matrix){
        var selector;
        var isElem;
        var domElem;

        for (var y=0; y<matrix.length; y++){
            for(var x=0; x<matrix[y].length; x++){
                isElem = (matrix[x][y] & 1) === 1;
                if (isElem){
                    selector = '#' + this.cssId + ' .mxrow' + y  + ' .mxcol' + x;
                    domElem = document.querySelector(selector);
                    domElem.style.background = matrix[x][y].color;
                }
            }
        }
    }

    p.__Table_drawMatrixBlocks = function(matrixBlockArr){
        var block, selector, domElem;
        for(var i=0; i<matrixBlockArr.length; i++){
            block = matrixBlockArr[i];
            selector = '#' + this.cssId + ' .mxrow' + block.y  + ' .mxcol' + block.x;
            domElem = document.querySelector(selector);
            domElem.innerText = 'X';
        }
    }

    /**
    *   Console drawing for testing
    */
    p.__Console_init = function(matrix){}

    p.__Console_redraw = function(matrix){
        console.log('\n ------------------ ');
        for(x=0; x<matrix.length; x++){
            console.log('\n');
            for (y=0; y<matrix[x].length; y++){
                console.log(matrix[x][y]);
            }
        }
    }

    p.__Console_showBlocks = function(matrix, matrixBlockArr){
    }

    ns.Draw = Draw;

})(dippejs)
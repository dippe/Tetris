this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var p = ns.Draw.prototype;

    /**
     *   First time table draw
     */
    p.__TableCss_init = function (width, height) {
        var rootDiv = document.getElementById(this.cssId);

        var tableHtml = '<table border="1">';
        for (var y = 0; y < height; y++) {
            tableHtml += '<tr class="mxrow' + y + '">';
            for (var x = 0; x < width; x++) {
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
    p.__TableCss_clear = function (matrix) {
        var domElems;

        domElems = document.querySelectorAll('#' + this.cssId + ' td');
        [].forEach.call(domElems, clearCellContent);

        function clearCellContent(elem, index, arr) {
            elem.innerHTML = '';
        }
    }

    p.__TableCss_drawMatrixBlocks = function (matrixBlockArr) {
        var block, selector, domElem;
        for (var i = 0; i < matrixBlockArr.length; i++) {
            block = matrixBlockArr[i];
            selector = '#' + this.cssId + ' .mxrow' + block.y + ' .mxcol' + block.x;
            domElem = document.querySelector(selector);
            domElem.innerText = 'X';
        }
    }

})(dippejs)
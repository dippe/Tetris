this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var p = ns.Draw.prototype;

    /**
     *   First time table draw
     */
    p.__TableChar_init = function (cssId, width, height) {
        var rootDiv = document.getElementById(cssId);

        var tableHtml = '<table border="1">';
        for (var y = 0; y < height; y++) {
            tableHtml += '<tr class="mxrow' + y + '">';
            for (var x = 0; x < width; x++) {
                tableHtml += '<td style="width:15px;height:15px;" class="mxcol' + x + '"> </td>';
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';

        rootDiv.innerHTML = tableHtml;
    }

    /**
     *   redraw the table content
     */
    p.__TableChar_clear = function (cssId) {
        var domElems;

        domElems = document.querySelectorAll('#' + cssId + ' td');
        [].forEach.call(domElems, clearCellContent);

        function clearCellContent(elem, index, arr) {
            elem.innerText = '0';
        }

        return this;
    }

    p.__TableChar_drawMatrixBlocks = function (cssId, matrixBlockArr) {
        var block, selector, domElem;
        for (var i = 0; i < matrixBlockArr.length; i++) {
            block = matrixBlockArr[i];
            selector = '#' + cssId + ' .mxrow' + block.y + ' .mxcol' + block.x;
            domElem = document.querySelector(selector);
            domElem.innerText = 'X';
        }
        return this;
    }

})(dippejs)
this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var p = ns.Draw.prototype;

    /**
     *   First time table draw
     */
    p.__TableCss_init = function (width, height) {
        var rootDiv = document.getElementById(this.cssId);

        var tableHtml = '<table class="drawTableCss">';
        for (var y = 0; y < height; y++) {
            tableHtml += '<tr class="mxrow' + y + '">';
            for (var x = 0; x < width; x++) {
                tableHtml += '<td class="mxcol' + x + '"> </td>';
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

        function clearCellContent(domElem, index, arr) {
            domElem.style.backgroundColor = "wheat";
            domElem.classList.remove("block");
        }

        return this;
    }

    p.__TableCss_drawMatrixBlocks = function (matrixBlockArr) {
        var block, selector, domElem;
        for (var i = 0; i < matrixBlockArr.length; i++) {
            block = matrixBlockArr[i];
            selector = '#' + this.cssId + ' .mxrow' + block.y + ' .mxcol' + block.x;
            domElem = document.querySelector(selector);
            domElem.classList.add("block");
            domElem.style.backgroundColor = block.color;
        }
        return this;
    }

})(dippejs)
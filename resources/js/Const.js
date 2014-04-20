this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var Const = {

        DrawType: {
            TABLE_CSS: 'TableCss',
            TABLE_CHAR: 'TableChar',
            CONSOLE: 'Console',
            DEFAULT_DRAW_TYPE: 'TableCss'
        },

        Main: {
            MATRIX_CSSID: 'matrixArea',
            FPS: 2,
            MATRIX_WIDTH: 10,
            MATRIX_HEIGHT: 15
        }

    }


    ns.Const = Const;
    Object.freeze(Const);

})
(this.dippejs)

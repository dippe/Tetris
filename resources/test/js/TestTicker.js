(function () {
    "use strict";

    var ns = dippejs;

    module("Ticker");

    test("init", function () {

        var underTestFpsString = getUnderTestWithParam("lkj", function () {
        });
        var underTestFpsNull = getUnderTestWithParam(null, function () {
        });
        var underTestFpsUndefined = getUnderTestWithParam(undefined, function () {
        });
        var underTestFpsNegative = getUnderTestWithParam(-1, function () {
        });
        var underTestFpsPositiveAndCallbackFunc = getUnderTestWithParam(1.2, function () {
        });

        var underTestCallbackUndefined = getUnderTestWithParam(1.2);
        var underTestCallbackNum = getUnderTestWithParam(1.2, 1);

        ok(_isInitException(underTestCallbackNum), "underTestCallbackNum");
        ok(_isInitException(underTestCallbackUndefined), "underTestCallbackUndefined");
        ok(_isInitException(underTestFpsNegative), "underTestFpsNegative");
        ok(_isInitException(underTestFpsString), "underTestFpsString");
        ok(_isInitException(underTestFpsNull), "underTestFpsNull");
        ok(_isInitException(underTestFpsUndefined), "underTestFpsUndefined");
        ok(!_isInitException(underTestFpsPositiveAndCallbackFunc), "underTestFpsPositiveAndCallbackFunc");

    });

    function getUnderTestWithParam(fps, callback) {
        var ticker = new ns.Ticker();
        return function () {
            ticker.init(fps, callback);
        }
    }

    function _isInitException(func) {

        try {
            func();
            return false;
        } catch (e) {
            return true;
        }

    }

}).call(this)
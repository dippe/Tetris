ns = dippejs;

module("Tetrimino");

test("getAsMatrixBlockArr", function () {
    var size4Tetrimino = new ns.Tetrimino(1, 1);

    var underTestArr = size4Tetrimino.getAsMatrixBlockArr();

    equal(underTestArr.length, 4, "Array Size OK");

});


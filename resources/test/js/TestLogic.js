//Logic.__testonly__._isCollision = _isCollision;
//Logic.__testonly__._isOnMatrixEndCollision = _isOnMatrixEndCollision;
//Logic.__testonly__._isOnMatrixSideCollision = _isOnMatrixSideCollision;

ns = dippejs;

module("Logic");

test("_isBlockCollision", function () {
    var underTest = ns.Logic.__testonly__._isBlockCollision;

    ok(!underTest(new ns.MatrixBlock(0, 1, ""), new ns.MatrixBlock(0, 0, "")), "eq X");
    ok(!underTest(new ns.MatrixBlock(1, 0, ""), new ns.MatrixBlock(0, 0, "")), "eq Y");
    ok(!underTest(new ns.MatrixBlock(1, 1, ""), new ns.MatrixBlock(0, 0, "")), "No collision");
    ok(underTest(new ns.MatrixBlock(0, 0, ""), new ns.MatrixBlock(0, 0, "")), "X and Y collision");
});

test("_isOnMatrixEndCollision", function () {
    var underTest = ns.Logic.__testonly__._isOnMatrixEndCollision;
    var height = 10;
    var blockBeforeEnd = new ns.MatrixBlock(0, height - 1, "");
    var blockAfterEnd = new ns.MatrixBlock(0, height + 1, "");
    var blockOnEnd = new ns.MatrixBlock(0, height, "");

    ok(underTest(blockAfterEnd, height), "blockAfterEnd");
    ok(!underTest(blockBeforeEnd, height), "blockBeforeEnd");
    ok(underTest(blockOnEnd, height), "blockOnHeight");
});


test("_isOnMatrixSideCollision", function () {
    var underTest = ns.Logic.__testonly__._isOnMatrixSideCollision;
    var width = 10;
    var y = 2;
    var blockAfterRightSide = new ns.MatrixBlock(width + 1, y, "");
    var blockBeforeRightSide = new ns.MatrixBlock(width - 1 - 1, y, "");
    var blockOnRightSide = new ns.MatrixBlock(width - 1, y, "");
    var blockBeforeLeftSide = new ns.MatrixBlock(0 - 1, y, "");
    var blockAfterLeftSide = new ns.MatrixBlock(0 + 1, y, "");
    var blockOnLeftSide = new ns.MatrixBlock(0, y, "");

    ok(underTest(blockAfterRightSide, width), "blockAfterRightSide");
    ok(!underTest(blockBeforeRightSide, width), "blockBeforeRightSide");
    ok(!underTest(blockOnRightSide, width), "blockOnRightSide");

    ok(underTest(blockBeforeLeftSide, width), "blockBeforeLeftSide");
    ok(!underTest(blockAfterLeftSide, width), "blockAfterLeftSide");
    ok(!underTest(blockOnLeftSide, width), "blockOnLeftSide");

});


test("isNextStepCollision", function () {
    var underTest = ns.Logic.isNextStepCollision;

    var matrixHeight = 10;
    var matrixWidth = 10;
    var offsetX = 1;
    var offsetY = 1;
    var matrixBlocks = [
        new ns.MatrixBlock(1, 9, "red"),
        new ns.MatrixBlock(2, 9, "red"),
        new ns.MatrixBlock(3, 9, "red")
    ];

    var tetriminoBlocks = [
        new ns.MatrixBlock(1, 1, "red"),
        new ns.MatrixBlock(1, 2, "red"),
        new ns.MatrixBlock(2, 1, "red"),
        new ns.MatrixBlock(2, 2, "red")
    ];

    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, -1, 7), "block block collision 1");
    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 2, 7), "block block collision 2");
    ok(!underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 3, 7), "block block no collision");

    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 0, matrixHeight), "bottom collision");
    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 0, matrixHeight - 3), "bottom -3 collision");
    ok(!underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 0, matrixHeight - 4), "bottom -4 no collision");

    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, -2, 0), "left side collision");
    ok(underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 8, 0), "right side collision");
    ok(!underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, 7, 0), "no right side collision");
    ok(!underTest(matrixBlocks, tetriminoBlocks, matrixHeight, matrixWidth, -1, 0), "no left side collision");

});
//Logic.__testonly__._isCollision = _isCollision;
//Logic.__testonly__._isOnMatrixEndCollision = _isOnMatrixEndCollision;
//Logic.__testonly__._isOnMatrixSideCollision = _isOnMatrixSideCollision;

ns = dippejs;

module("Logic");

test("_isCollision", function () {
    var underTest = ns.Logic.__testonly__._isCollision;

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
    ok(!underTest(blockOnEnd, height), "blockOnEnd");
});


test("_isOnMatrixSideCollision", function () {
    var underTest = ns.Logic.__testonly__._isOnMatrixSideCollision;
    var width = 10;
    var y = 2;
    var blockAfterRightSide = new ns.MatrixBlock(width + 1, y, "");
    var blockBeforeRightSide = new ns.MatrixBlock(width - 1, y, "");
    var blockOnRightSide = new ns.MatrixBlock(width, y, "");
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



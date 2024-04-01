const rows = 12;
const cols = 8;

// 当前游戏页面的大小
const mapState = Array.from({ length: rows }, () =>
  Array.from({ length: cols }).fill(0)
);

// 7种形状
const SHAPES = [
  // 0
  [
    [1, 1],
    [1, 1],
  ],
  // 1
  [[1, 1, 1, 1]],
  // 2
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // 3
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // 4
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  // 5
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  // 6
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
];

class Tetris {
  type = 0; //方块的形状
  shape = []; // 当前形状的二进制表示
  shapeToNumber = []; // 当前形状的数字表示
  constructor() {
    // 随机生成形状
    this.generate();
  }

  // 生成方块
  generate() {
    this.type = Math.floor(Math.random() * 7); // 0-6
    const placeHolder = cols - SHAPES[this.type][0].length;
    const left = Math.floor(placeHolder / 2);
    const right = placeHolder - left;
    this.shape = SHAPES[this.type].map((i) => {
      return Array.from({ length: left })
        .fill(0)
        .concat(i, Array.from({ length: right }).fill(0));
    });
    this.shapeToNumber = this.shape
      .map((i) => {
        return parseInt(i.join(""), 2);
      })
      .concat(Array.from({ length: rows - this.shape.length }).fill(0));

    console.log(this.shape, "shape");
    console.log(this.shapeToNumber, "shapeToNumber");
  }

  // 左移
  moveLeft() {
    // 判断边界
    if (this.shape.some((i) => i[0] === 1)) {
      return;
    }

    this.shape = this.shape.map((i) =>
      (("0b" + i.join("")) << 1)
        .toString(2)
        .padStart(cols, "0")
        .split("")
        .map(Number)
    );
    console.log(this.shape, "moveLeft");
  }

  // 右移
  moveRight() {
    if (this.shape.some((i) => i[cols - 1] === 1)) {
      return;
    }
    this.shape = this.shape.map((i) =>
      (("0b" + i.join("")) >> 1)
        .toString(2)
        .padStart(cols, "0")
        .split("")
        .map(Number)
    );
    console.log(this.shape, "moveRight");
  }

  // 下移
  moveDown() {
    if (
      this.shapeToNumber.every((i) => i === 0) ||
      this.shapeToNumber[rows - 1] === 1
    ) {
      // 结束
      return;
    }

    this.shapeToNumber.shift();
    this.shapeToNumber.push(0);
  }
}
const tetris = new Tetris();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      tetris.moveLeft();
      break;
    case "ArrowRight":
      tetris.moveRight();
      break;
  }
});

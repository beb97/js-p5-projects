var cWidth;
var cHeight;
var boardSize = 10;
var cellSize = 30;
var minesNumber = 1;

var boardSizeMin = 2;
var boardSizeMax = 10;

var cnv;
var game;
var board;
var button;
var prompt;
var sizeSlider;
var sizeCount;
var difficultySlider;
var difficultyCount;


function setup() {
  cWidth = cellSize * boardSize;
  cHeight = cellSize * boardSize;

  // CANEVAS
  cnv = createCanvas(cWidth,cHeight);
  cnv.parent('container');

  // PROMPT
  prompt = createDiv('').size(200, 20);
  prompt.parent('prompt');
  // SIZE
  sizeSlider = createSlider(boardSizeMin, boardSizeMax, 6);
  sizeSlider.parent('sizeSlider');
  sizeCount = select('#sizeCount');
  // DIFFICULTY
  difficultySlider = createSlider(1, 100, 20);
  difficultySlider.parent('difficultySlider');
  difficultyCount = select('#difficultyCount');

  //GAME
  game = new Game();
  board = game.board;

  // RESET
  button = createButton('Reset');
  button.parent('reset');
  button.position();
  button.mousePressed(game.reset);

}

function draw() {
  game.update();
  background(125);
  board.drawBoard();
}

function mousePressed() {
  board.handleClick();
  // return false;
}

class Game {
  constructor() {
    if(minesNumber > boardSize*boardSize -1) {
      minesNumber = boardSize*boardSize -1;
    }
    boardSize = sizeSlider.value();
    this.board = new Board(boardSize);
  }

  reset() {
    this.board = new Board(boardSize);
    board = this.board;
  }

  update() {

    if (sizeSlider.value() != boardSize) {
      boardSize = sizeSlider.value();
      game.reset();
    }

    if (difficultySlider.value() != minesNumber) {
      var maxMines = boardSize*boardSize-1;
      minesNumber = int(map(difficultySlider.value(),1,100,1,maxMines));
      // game.reset();
    }

    difficultyCount.html(minesNumber);
    sizeCount.html(boardSize);

  }
}

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

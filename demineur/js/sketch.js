var cWidth;
var cHeight;
var boardSize = 10;
var cellSize = 30;
var minesNumber = 1;

var cnv;
var game;
var board;
var button;
var prompt;


function setup() {
  cWidth = cellSize * boardSize;
  cHeight = cellSize * boardSize;
  cnv = createCanvas(cWidth,cHeight);

  game = new Game();
  board = game.board;
  prompt = createDiv('').size(200, 20);
  button = createButton('Reset');
  button.position();
  button.mousePressed(game.reset);
}

function draw() {
  background(125);
  board.drawBoard();
}

function mousePressed() {
  board.handleClick();
  return false;
}

class Game {
  constructor() {
    if(minesNumber > boardSize*boardSize -1) {
      minesNumber = boardSize*boardSize -1;
    }
    this.board = new Board(boardSize);
  }

  reset() {
    this.board = new Board(boardSize);
    board = this.board;
  }
}

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

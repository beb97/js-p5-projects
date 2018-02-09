// Game
var game;
// IHM
var cnv;
var home;
var button;
var prompt;
var sizeSlider;
var sizeCount;
var difficultySlider;
var difficultyCount;


function setup() {

  //GAME
  game = new Game();

  var cWidth = game.settings.cellSize * game.settings.boardSizeMax;
  var cHeight = game.settings.cellSize * game.settings.boardSizeMax;

  // CANEVAS
  cnv = createCanvas(cWidth,cHeight);
  cnv.parent('canevas');

  // PROMPT
  prompt = select('#prompt');

  home = select('#home');
  // SIZE
  sizeSlider = createSlider(game.settings.boardSizeMin, game.settings.boardSizeMax, game.settings.boardSizeDefault);
  sizeSlider.parent('sizeSlider');
  sizeCount = select('#sizeCount');
  // DIFFICULTY
  difficultySlider = createSlider(game.settings.difficultyMin, game.settings.difficultyMax, game.settings.difficultyDefault);
  difficultySlider.parent('difficultySlider');
  difficultyCount = select('#difficultyCount');

  // RESET
  button = select('#reset');
  button.mousePressed(game.reset);

}

function draw() {
  game.update();
  game.board.drawBoard();
}

function mousePressed() {
  if ( game.withinCanevas(mouseX, mouseY) ) {
    game.board.handleClick();
  }
}

class Settings {
  constructor(boardSize = 5, difficulty = 25) {
    this.boardSizeMin = 2;
    this.boardSizeMax = 10;
    this.boardSizeDefault = 5;
    this.boardSize = boardSize;
    this.difficultyMin = 1;
    this.difficultyMax = 99;
    this.difficultyDefault = 25;
    this.difficulty = difficulty;
    this.cellSize = 30;
  }

  getMinesNumber() {
    var maxMines = this.boardSize*this.boardSize-1;
    return int(map(this.difficulty,this.difficultyMin,this.difficultyMax,1,maxMines));
  }
}

class Game {
  constructor() {
    this.settings = new Settings();
    this.board = new Board(this.settings.boardSize);
  }

  reset() {
    delete game.settings;
    delete game.board;
    game.settings = new Settings(sizeSlider.value(), difficultySlider.value());
    game.board = new Board(game.settings.boardSize);
  }

  update() {

    if (sizeSlider.value() != this.settings.boardSize) {
      this.reset();
    }

    if (difficultySlider.value() != this.settings.difficulty) {
      this.reset();
    }

    difficultyCount.html(this.settings.getMinesNumber());
    sizeCount.html(this.settings.boardSize);
  }

  withinCanevas(x,y) {
    return (0 < x && x <= cnv.width) && ( 0 < y && y <= cnv.height);
  }
}

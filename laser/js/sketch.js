// Game
var game;
// IHM
var cnv;
var home;
var button;
var prompt;


function setup() {
  frameRate(0.5);
  angleMode(DEGREES);
  game = new Game();
  game.draw();
}

function draw() {
  game.update();
  game.board.draw();
}

function mousePressed() {
  if ( game.withinCanevas(mouseX, mouseY) ) {
    game.board.handleClick();
  }
}

class Settings {
  constructor(boardSize = 10) {
    this.boardSizeDefault = 10;
    this.boardSize = boardSize;
    this.cellSize = 40;
  }
}

class Game {
  constructor() {
    this.settings = new Settings();
    this.board = new Board(this.settings.boardSize);
    this.players = [new Player(), new Player()];
  }

  reset() {
    delete game.settings;
    delete game.board;
    game.settings = new Settings();
    game.board = new Board(game.settings.boardSize);
  }

  update() {
  }

  withinCanevas(x,y) {
    return (0 < x && x <= cnv.width) && ( 0 < y && y <= cnv.height);
  }

  draw() {
    var cWidth = game.settings.cellSize * game.settings.boardSize;
    var cHeight = game.settings.cellSize * game.settings.boardSize;

    // CANEVAS
    cnv = createCanvas(cWidth,cHeight);
    cnv.parent('canevas');

    // PROMPT
    prompt = select('#prompt');
    home = select('#home');

    // RESET
    button = select('#reset');
    button.mousePressed(game.reset);
  }

}

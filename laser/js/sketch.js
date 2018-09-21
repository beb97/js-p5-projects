// Game
var game;
// IHM
var cnv;
var home;
var button;
var prompt;


function setup() {
    frameRate(25);
    angleMode(DEGREES);
    game = new Game();
    game.draw();
}

function draw() {
    game.update();
    game.board.draw();
}

function mousePressed() {
        game.board.commandManager.handleClick();
}

function keyPressed() {
        game.board.commandManager.handleKey();
}

class Settings {
    constructor(boardwidth = 10, boardHeight = 8) {
        this.boardwidth = boardwidth;
        this.boardHeight = boardHeight;
        this.cellSize = 50;
    }
}

class Game {
    constructor() {
        this.settings = new Settings();
        this.board = new Board(this.settings.boardwidth, this.settings.boardHeight);
    }

    reset() {
        delete game.settings;
        delete game.board;
        game.settings = new Settings();
        game.board = new Board(this.settings.boardwidth, this.settings.boardHeight);
    }

    update() {
    }

    withinCanevas(x,y) {
        return (0 < x && x <= cnv.width) && ( 0 < y && y <= cnv.height);
    }

    draw() {
        const cWidth = game.settings.cellSize * game.settings.boardwidth +1;
        const cHeight = game.settings.cellSize * game.settings.boardHeight +1;

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

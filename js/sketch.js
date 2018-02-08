var cWidth = 300;
var cHeight = 300;
var boardSize = 10;
var cellSize = 30;
var minesNumber = 10;

var cnv;
var game;
var board;
var button;


function setup() {
  cWidth = cellSize * boardSize + 200;
  cHeight = cellSize * boardSize;
  cnv = createCanvas(cWidth,cHeight);
  game = new Game();
  board = game.board;
  button = createButton('click me');
  //button.position(cellSize * boardSize + 10);
  //button.moussePressed(game.reset);
}

function draw() {
  background(125);
  board.drawBoard();
}

function mouseClicked() {
  board.handleClick();
}

class Game {
  constructor() {
    this.board = new Board(boardSize);
  }

  reset() {
    this.board = new Board(boardSize);
    board = this.board;
  }
}

class Cell {

  constructor(index) {
    this.index = index;
    this.isMine = false;
    this.revealed = false
  }

  draw() {
    var revealedColor = 'white';
    var notRevealedColor = 200;
    var borderColor = 127;
    var borderSize = 1;

    var corner = this.getTopLeftCorner();
    var center = this.getCenter();
    var neighborsMineNumber = this.countNeighborsMines();

    stroke(borderColor); // Bordure
    if(this.revealed) {
      fill(revealedColor);
      rect(corner.x, corner.y, cellSize-borderSize, cellSize-borderSize);
      if(this.isMine) {
        fill('red');
        ellipse(center.x, center.y, cellSize/2);
      } else if (neighborsMineNumber > 0) {
        fill('cyan');
        textSize(cellSize/2);
        textAlign(CENTER, CENTER);
        text(neighborsMineNumber, center.x, center.y);
      }
    } else {
      fill(notRevealedColor);
      rect(corner.x, corner.y, cellSize-borderSize, cellSize-borderSize);
    }

  }

  getTopLeftCorner() {
    return new Point(this.x() * cellSize, this.y() * cellSize);
  }

  getCenter() {
    var corner = this.getTopLeftCorner();
    return new Point(corner.x + cellSize/2, corner.y + cellSize/2);
  }

  getNeighbors(mode) {
    var N  = new Point(0 ,-1);
    var NE = new Point(1 ,-1);
    var E  = new Point(1 , 0);
    var SE = new Point(1 , 1);
    var S  = new Point(0 , 1);
    var SW = new Point(-1, 1);
    var W  = new Point(-1, 0);
    var NW = new Point(-1,-1);
    var positions;
    switch (mode) {
      case 'DIRECT':
      positions = [N,W,E,S];
      break;
      default:
      positions = [NW,N,NE,W,E,SW,S,SE];
      break;
    }
    var neighbors = positions.map(position => board.get( this.x()+position.x, this.y()+position.y ))
    .filter(neighbor => neighbor!= undefined);
    return neighbors;
  }

  countNeighborsMines() {
    return this.getNeighbors().filter(neighbor => neighbor.isMine).length;
  }

  clicked() {
    if(!this.revealed) {
      this.revealed = true;
      this.propagadeClick();
      if(this.isMine) {
        board.gameOver();
      }
    }
  }

  propagadeClick() {
    if(this.countNeighborsMines() == 0) {
      this.getNeighbors('DIRECT').filter(neighbor => neighbor.countNeighborsMines() == 0).forEach(cell => cell.clicked());
    }
  }

  x() {
    return this.index % boardSize;
  }

  y() {
    return Math.trunc( this.index / boardSize );
  }

}

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class Board {

  constructor(size) {
    this.width = size;
    this.height = size;
    this.mineGenerated = false;
    this.clickedCell = undefined;
    this.gameIsOver = false;
    this.cells = new Array(this.width * this.height).fill().map( (item, index) => new Cell(index) );
  }

  drawBoard() {
    for( const [index, cell] of this.cells.entries() ){
      cell.draw(index);
    }
  }

  get(x,y) {
    if (this.xIsValide(x) && this.yIsValide(y)) {
      return this.cells[x + y*this.width];
    } else {
      return undefined;
    }
  }

  xIsValide(x) {
    return x>=0 && x<this.width;
  }

  yIsValide(y) {
    return y>=0 && y<this.height;
  }

  getClickedCell() {
    var x = Math.floor(mouseX/cellSize);
    var y = Math.floor(mouseY/cellSize);
    this.clickedCell = this.get(x, y);
    return this.clickedCell;
  }

  getFirstCell() {
    return this.cells[0];
  }

  getNextCell(index) {
    if (index+1 >= this.cells.length) {
      return this.cells[0];
    } else {
      return this.cells[index+1];
    }
  }

  generateMines() {
    if (!this.mineGenerated) {

      var minProbability = 0.01;
      var mineCount = 0;
      var currentCell = this.getFirstCell();


      // Tant qu'on a pas assez de mines
      while (mineCount<minesNumber) {
        // Cell n'est pas celle cliqué, ni deja minée
        if (currentCell !== this.clickedCell && !currentCell.isMine) {
          if (random()<minProbability) {
            currentCell.isMine = true;
            mineCount++;
          }
        }
        currentCell = this.getNextCell(currentCell.index);
      }

      this.mineGenerated = true;
    }
  }

  handleClick() {
    console.log(mouseX, mouseY);
    board.getClickedCell();
    if(board.clickedCell && !board.gameIsOver) {
      board.generateMines();
      board.clickedCell.clicked();
    }
  }

  gameOver() {
    this.gameIsOver = true;
  }

}

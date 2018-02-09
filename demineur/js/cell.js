class Cell {

  constructor(index) {
    this.index = index;
    this.isMine = false;
    this.revealed = false;
    this.flaged = false;
  }

  draw() {
    var revealedColor = 'white';
    var revealedMine = '#ffc2b3';
    var flaged = '#e6ffe6';
    var notRevealedColor = 200; // Gris pale
    var borderColorDefault = 100; // Gris fonce
    var borderColorHover = "#e6ffe6"; // Gris fonce
    var neighborsMineNumber = this.countNeighborsMines();

    // Fond
    var backgroundColor;
    if (this.revealed) {
      if (this.isMine) {
        backgroundColor = revealedMine;
      } else {
        backgroundColor = revealedColor;
      }
    } else {
      if (this.flaged) {
        backgroundColor = flaged;
      } else {
        backgroundColor = notRevealedColor;
      }
    }
    fill(backgroundColor);
    var borderColor = (this == game.board.getCurrentCell()) ? borderColorHover : borderColorDefault;
    stroke(borderColor); // Bordure
    this.drawBackGround();

    // MINE
    if(this.revealed || game.board.isGameStoped()) {
      if(this.isMine) {
        this.drawMine();
      }
    }

    // FLAG
    if(this.flaged) {
        this.drawFlag();
    }

    // NUMBER
    if(this.revealed && !this.isMine) {
        if (neighborsMineNumber > 0) {
          this.drawCounter(neighborsMineNumber);
        }
    }

  }

  drawBackGround() {
    var corner = this.getTopLeftCorner();
    var borderSize = 1;
    rect(corner.x, corner.y, game.settings.cellSize-borderSize, game.settings.cellSize-borderSize);
  }

  drawMine() {
    var center = this.getCenter();
    fill('red');
    ellipse(center.x, center.y, game.settings.cellSize/2);
  }

  drawFlag() {
    var center = this.getCenter();
    fill('green');
    var d = game.settings.cellSize/4;
    triangle(center.x, center.y - d,center.x - d , center.y +d, center.x + d, center.y + d);
  }

  drawCounter(neighborsMineNumber) {
    var center = this.getCenter();
    fill('black');
    textSize(game.settings.cellSize/2);
    textAlign(CENTER, CENTER);
    text(neighborsMineNumber, center.x, center.y);
  }

  getTopLeftCorner() {

    // Centrage du board
    var boardWidth = game.settings.boardSize * game.settings.cellSize;
    var diff  = cnv.width - boardWidth;
    var d = diff/2;
    return createVector(this.x() * game.settings.cellSize + d , this.y() * game.settings.cellSize  + d);
  }

  getCenter() {
    var corner = this.getTopLeftCorner();
    return createVector(corner.x + game.settings.cellSize/2, corner.y + game.settings.cellSize/2);
  }

  getNeighbors(mode) {
    var N  = createVector(0 ,-1);
    var NE = createVector(1 ,-1);
    var E  = createVector(1 , 0);
    var SE = createVector(1 , 1);
    var S  = createVector(0 , 1);
    var SW = createVector(-1, 1);
    var W  = createVector(-1, 0);
    var NW = createVector(-1,-1);
    var positions;
    switch (mode) {
      case 'DIRECT':
      positions = [N,W,E,S];
      break;
      default:
      positions = [NW,N,NE,W,E,SW,S,SE];
      break;
    }
    var neighbors = positions.map(position => game.board.get( this.x()+position.x, this.y()+position.y ))
    .filter(neighbor => neighbor!= undefined);
    return neighbors;
  }

  countNeighborsMines() {
    return this.getNeighbors().filter(neighbor => neighbor.isMine).length;
  }

  clicked() {
  if(mouseButton === CENTER) {
      this.rightClicked();
    } else if (mouseButton === LEFT) {
      this.leftClicked();
    }
  }

  leftClicked() {
    if(!this.revealed && !this.flaged) {
      this.revealed = true;
      this.propagadeClick();
    }
  }

  rightClicked() {
    if(!this.revealed) {
      this.flaged = !this.flaged;
    }
  }

  propagadeClick() {
    if(this.countNeighborsMines() == 0) {
      this.getNeighbors('DIRECT').filter(neighbor => neighbor.countNeighborsMines() == 0).forEach(cell => cell.clicked());
    }
  }

  x() {
    return this.index % game.settings.boardSize;
  }

  y() {
    return Math.trunc( this.index / game.settings.boardSize );
  }

}

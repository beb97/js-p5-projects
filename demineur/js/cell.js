class Cell {

  constructor(index) {
    this.index = index;
    this.isMine = false;
    this.revealed = false;
    this.flaged = false;
  }

  draw() {
    var revealedColor = 'white';
    var notRevealedColor = 200; // Gris pale
    var borderColor = 100; // Gris fonce

    var neighborsMineNumber = this.countNeighborsMines();

    stroke(borderColor); // Bordure
    if(this.revealed) {
      fill(revealedColor);
      this.drawBackGround();
    } else {
      fill(notRevealedColor);
      this.drawBackGround();
    }

    if(this.flaged) {
      //if(this.isFlaged && !board.isGameStoped()) {
        this.drawFlag();
    }

    if(this.revealed || board.isGameStoped()) {
      if(this.isMine) {
        this.drawMine();
      }
    }

    if(this.revealed && !this.isMine) {
        if (neighborsMineNumber > 0) {
          this.drawCounter(neighborsMineNumber);
        }
    }

  }

  drawBackGround() {
    var corner = this.getTopLeftCorner();
    var borderSize = 1;
    rect(corner.x, corner.y, cellSize-borderSize, cellSize-borderSize);
  }

  drawMine() {
    var center = this.getCenter();
    fill('red');
    ellipse(center.x, center.y, cellSize/2);
  }

  drawFlag() {
    var center = this.getCenter();
    fill('green');
    var d = cellSize/4;
    triangle(center.x, center.y - d,center.x - d , center.y +d, center.x + d, center.y + d);
  }

  drawCounter(neighborsMineNumber) {
    var center = this.getCenter();
    fill('black');
    textSize(cellSize/2);
    textAlign(CENTER, CENTER);
    text(neighborsMineNumber, center.x, center.y);
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
    return this.index % boardSize;
  }

  y() {
    return Math.trunc( this.index / boardSize );
  }

}

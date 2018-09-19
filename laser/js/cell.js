class Cell {

  constructor(index) {
    this.index = index;
    this.piece = undefined;
  }

  draw() {
    this.drawBackGround();
    this.drawBoarder();
    this.drawPiece();
    this.drawRay();
  }

  drawBoarder() {
    var borderColorNormal = 100; // Gris fonce
    var borderColorHover = 800; // Gris fonce
    var borderColor = (this == game.board.getCurrentCell()) ? borderColorHover : borderColorNormal;
    stroke(borderColor); // Bordure
  }

  drawBackGround() {
    // var backgroundColor = 'white';
    // fill(backgroundColor);
    var corner = this.getTopLeftCorner();
    var borderSize = 1;
    stroke('black');
    rect(corner.x, corner.y, game.settings.cellSize-borderSize, game.settings.cellSize-borderSize);
  }

  drawPiece() {
    if (  this.piece != undefined ) {
      this.piece.draw(this.getCenter());
    }
  }

  drawRay() {
    if (  this.ray != undefined ) {
      this.ray.draw();
    }
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

  react(ray) {
    if(this.piece != undefined) {
      return this.piece.react(ray);
    } else {
      return ray;
    }
  }

  clicked() {
    if(mouseButton === CENTER) {
      this.rightClicked();
    } else if (mouseButton === LEFT) {
      this.leftClicked();
    }
  }

  leftClicked() {
    null;
  }

  rightClicked() {
    null;
  }

  x() {
    return this.index % game.settings.boardSize;
  }

  y() {
    return Math.trunc( this.index / game.settings.boardSize );
  }

  getCoord() {
    return createVector(this.x(), this.y());
  }

}

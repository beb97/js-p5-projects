class Board {

  constructor(size) {
    this.width = size;
    this.height = size;
    this.minesCount = 0;
    this.clickedCell = undefined;
    this.gameIsOver = false;
    this.gameIsWon = false;
    this.text = '';
    this.cells = new Array(this.width * this.height).fill().map( (item, index) => new Cell(index) );
  }

  drawBoard() {
    var backgroundColor;
    var won = '#99e699';
    var lost = '#ffc2b3';
    var variableColor = floor(map(game.settings.difficulty, game.settings.difficultyMin, game.settings.difficultyMax, 150, 50));
    if (this.gameIsWon) {
      backgroundColor = won;
    } else if (this.gameIsOver) {
      backgroundColor = lost;
    } else {
      backgroundColor = variableColor;
    }
    home.style(this.greyScaleToRgbColorCss(variableColor));
    background(backgroundColor);

    for( let [index, cell] of this.cells.entries() ){
      cell.draw(index);
    }
    prompt.html(this.text);
  }

  greyScaleToRgbColorCss(grey) {
    return "color:rgb("+grey+","+grey+","+grey+")";
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
    this.clickedCell = this.getCurrentCell();
    return this.clickedCell;
  }

  getCurrentCell() {
    // Centrage du board
    var boardWidth = game.settings.boardSize * game.settings.cellSize;
    var diff  = cnv.width - boardWidth;
    var d = diff/2;

    var x = Math.floor((mouseX - d)/game.settings.cellSize);
    var y = Math.floor((mouseY - d)/game.settings.cellSize);
    return  this.get(x, y);
  }

  generateMines() {
    if (this.minesCount == 0) {

      // Probabilité en fonction de la densité de mines.
      var mineCounter = 0;
      var mineWanted = game.settings.getMinesNumber();
      var minProbability = mineWanted/this.cells.length;

      var candidates = this.cells.filter(cell => cell != this.clickedCell);
      var canditateIndex = 0;

      // Tant qu'on a pas assez de mines
      while (mineCounter<mineWanted) {

          // Mine sur cette cellule ?
          if (random()<minProbability) {
            this.cells[candidates[canditateIndex].index].isMine = true;
            mineCounter++;
            candidates.splice(canditateIndex,1); // L'élément n'est plus un candidat
          }

          // Prochaine cellule
          if (canditateIndex >= candidates.length-1) {
            canditateIndex = 0; // On reboucle
          } else {
            canditateIndex++; // On cherche le prochain candidat;
          }
      }

      this.minesCount = mineCounter;
    }
  }

  handleClick() {
    console.log(mouseX, mouseY);
    this.getClickedCell();
    if(this.clickedCell && !this.isGameStoped()) {
      this.generateMines();
      this.clickedCell.clicked();
      this.checkStatus();
    }

  }

  checkStatus() {
    if (this.isLost()) {
      this.gameIsOver = true;
      this.text='oh no :( you died x_x';
    } else if (this.isWon()) {
      this.gameIsWon = true;
      this.text="Good job ! You got'em all :D";
    }
  }

  isLost() {
    var isLost = false;
    if(this.clickedCell.isMine && !this.clickedCell.flaged && mouseButton === LEFT ) {
      isLost = true;
    }
    return isLost;
  }

  isWon() {
    var isWon = false;
    var revealed = this.cells.filter(cell => cell.revealed).length;
    if(this.minesCount == this.cells.length-revealed) {
      isWon = true;
    }
    return isWon;
  }

  isGameStoped() {
    return this.gameIsWon || this.gameIsOver;
  }

}

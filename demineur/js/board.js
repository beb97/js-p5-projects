class Board {

  constructor(size) {
    this.width = size;
    this.height = size;
    this.mineGenerated = false;
    this.clickedCell = undefined;
    this.gameIsOver = false;
    this.gameIsWon = false;
    this.text = '';
    this.cells = new Array(this.width * this.height).fill().map( (item, index) => new Cell(index) );
  }

  drawBoard() {
    for( const [index, cell] of this.cells.entries() ){
      cell.draw(index);
    }
    prompt.html(board.text);
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
    if(board.clickedCell && !this.isGameStoped()) {
      board.generateMines();
      board.clickedCell.clicked();
      board.checkStatus();
    }

  }

  checkStatus() {
    if (this.isLost()) {
      this.gameIsOver = true;
      this.text='Boom. You ded x_x';
    } else if (this.isWon()) {
      board.gameIsWon = true;
      this.text="Yeas ! You got'em all :D";
    } else {
      this.text=minesNumber+' mines';

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
    var cellsNumber = boardSize*boardSize;
    var revealed = board.cells.filter(cell => cell.revealed).length;
    if(minesNumber == cellsNumber-revealed) {
      isWon = true;
    }
    return isWon;
  }

  isGameStoped() {
    return this.gameIsWon || this.gameIsOver;
  }

}

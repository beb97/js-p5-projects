class Board {

    constructor(size) {
        this.width = size;
        this.height = size;
        this.movingPiece = null;
        this.clickedCell = undefined;
        this.gameIsOver = false;
        this.gameIsWon = false;
        this.text = '';
        this.cells = new Array(this.width * this.height).fill().map( (item, index) => new Cell(index) );
        this.players = [new Player("1", color(0,180,0,255)), new Player("2", color(180,0,0,255))];
        this.layout = new Layout(this).classic().import();
        this.rayPather = new RayPather();
    }

    draw() {
        const backgroundColor = '#888888';
        background(backgroundColor);

        for( let [index, cell] of this.cells.entries() ){
            cell.draw(index);
        }

        for( let cell of this.cells ){
            cell.drawPiece();
        }

        this.rayPather.draw();

        prompt.html(this.text);
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
        const boardWidth = game.settings.boardSize * game.settings.cellSize;
        const diff = cnv.width - boardWidth;
        const d = diff / 2;

        const x = Math.floor((mouseX - d) / game.settings.cellSize);
        const y = Math.floor((mouseY - d) / game.settings.cellSize);
        return  this.get(x, y);
    }

    handleClick() {
        this.getClickedCell();
        console.log(mouseX, mouseY, this.clickedCell);
        if(this.clickedCell && !this.isGameStoped()) {
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
        const isLost = false;
        return isLost;
    }

    isWon() {
        const isWon = false;
        return isWon;
    }

    isGameStoped() {
        return this.gameIsWon || this.gameIsOver;
    }

}

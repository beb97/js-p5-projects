class Layout {
    constructor(board) {
        this.board = board;
        this.map = [];
    }

    import() {
        for (let currentPiece of this.map) {
            currentPiece.cell.piece = currentPiece;
        }
        return this;
    }

    classic() {
        const cells = this.board.cells;
        this.reset();
        this.map.push(new Laser(cells[0]));
        this.map.push(new Miroir(cells[4]));
        this.map.push(new Miroir(cells[6]));
        this.map.push(new Miroir(cells[20]));
        this.map.push(new Miroir(cells[24]));
        this.map.push(new Laser(cells[46], new Orientation(-90) ));
        return this;
    }

    clear() {
        for (let cell of this.board.cells) {
            cell.piece = null;
        }
    }

    reset() {
        this.map = [];
        this.clear();
        return this;
    }
}

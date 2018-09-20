class Layout {
    constructor(board) {
        this.board = board;
        this.players = board.players;
    }

    import() {
        for (let player of this.players) {
            for (let currentPiece of player.pieces) {
                currentPiece.cell.piece = currentPiece;
            }
        }
        return this;
    }

    classic() {
        this.reset();
        const cells = this.board.cells;
        let player = this.players[0];
        player.addPiece(new Laser(cells[0]));
        player.addPiece(new Mirror(cells[4], new Orientation(180) ));
        player.addPiece(new DoubleMirror(cells[6]));
        player.addPiece(new Mirror(cells[20]));
        player.addPiece(new Mirror(cells[24]));
        player.addPiece(new DoubleMirror(cells[62]));
        player = this.players[1];
        player.addPiece(new Laser(cells[46], new Orientation(-90) ));
        player.addPiece(new DoubleMirror(cells[66]));
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

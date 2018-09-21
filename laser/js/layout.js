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

            this.setPlayerCells();
            for (let currentCell of player.cells) {
                this.board.cells[currentCell].player = player;
            }

        }
        return this;
    }

    setPlayerCells() {
        let player = this.players[0];
        player.cells = [0, 8, 10,20,30,40,50,60,70,80,90, 98];

        player = this.players[1];
        player.cells = [1, 9,19,29,39,49,59,69,79,89, 91, 99];

    }

    classic() {
        this.reset();
        const cells = this.board.cells;
        let player = this.players[0];

        player.addPiece(new Laser(cells[0], new Orientation(90) ));
        player.addPiece(new Guard(cells[4], new Orientation(90) ));
        player.addPiece(new King(cells[5], new Orientation(90) ));
        player.addPiece(new Guard(cells[6], new Orientation(90) ));
        player.addPiece(new Mirror(cells[7], new Orientation(90) ));

        player.addPiece(new Mirror(cells[12], new Orientation(180) ));

        player.addPiece(new Mirror(cells[40], new Orientation(0) ));
        player.addPiece(new DoubleMirror(cells[44], new Orientation(0) ));
        player.addPiece(new DoubleMirror(cells[45], new Orientation(90) ));
        player.addPiece(new Mirror(cells[47], new Orientation(90) ));

        player.addPiece(new Mirror(cells[50], new Orientation(90) ));
        player.addPiece(new Mirror(cells[57], new Orientation(0) ));

        player.addPiece(new Mirror(cells[66], new Orientation(90) ));


        player = this.players[1];

        player.addPiece(new Mirror(cells[23], new Orientation(-90) ));

        player.addPiece(new Mirror(cells[49], new Orientation(-90) ));
        player.addPiece(new Mirror(cells[42], new Orientation(180) ));

        player.addPiece(new Mirror(cells[59], new Orientation(180) ));
        player.addPiece(new DoubleMirror(cells[55], new Orientation(0) ));
        player.addPiece(new DoubleMirror(cells[54], new Orientation(90) ));
        player.addPiece(new Mirror(cells[52], new Orientation(-90) ));

        player.addPiece(new Mirror(cells[87], new Orientation(0) ));

        player.addPiece(new Laser(cells[99], new Orientation(-90) ));
        player.addPiece(new Guard(cells[95], new Orientation(-90) ));
        player.addPiece(new King(cells[94], new Orientation(-90) ));
        player.addPiece(new Guard(cells[93], new Orientation(-90) ));
        player.addPiece(new Mirror(cells[92], new Orientation(-90) ));

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

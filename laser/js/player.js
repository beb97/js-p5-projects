class Player {

    constructor(name, color = 'green') {
        this.name = name;
        this.color = color;
        this.pieces = [];
    }

    addPiece(piece) {
        piece.player = this;
        this.pieces.push(piece);
    }

}

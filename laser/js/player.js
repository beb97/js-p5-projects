class Player {

    constructor(name, pColor = 'green') {
        this.id = name;
        this.color = pColor;
        this.pieces = [];
        this.cells = [];
    }

    addPiece(piece) {
        piece.player = this;
        this.pieces.push(piece);
    }

    getColor(alpha = 255) {
        let newColor = color(this.color.toString());
        newColor.setAlpha(alpha);
        return newColor;
    }

}

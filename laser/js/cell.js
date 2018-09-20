class Cell {

    constructor(index) {
        this.index = index;
        this.piece = null;
    }

    draw() {
        this.drawBackGround();
        this.drawBoarder();
        this.drawPiece();
    }

    drawBoarder() {
        const borderColorNormal = 100; // Gris fonce
        const borderColorHover = 800; // Gris fonce
        const borderColor = (this === game.board.getCurrentCell()) ? borderColorHover : borderColorNormal;
        stroke(borderColor); // Bordure
    }

    drawBackGround() {
        const corner = this.getTopLeftCorner();
        const borderSize = 1;
        stroke('black');
        rect(corner.x, corner.y, game.settings.cellSize-borderSize, game.settings.cellSize-borderSize);
    }

    drawPiece() {
        if (  this.piece != null ) {
            this.piece.draw(this.getCenter());
        }
    }

    getTopLeftCorner() {
        // Centrage du board
        const boardWidth = game.settings.boardSize * game.settings.cellSize;
        const diff = cnv.width - boardWidth;
        const d = diff / 2;
        return createVector(this.x() * game.settings.cellSize + d, this.y() * game.settings.cellSize + d);
    }

    getCenter() {
        const corner = this.getTopLeftCorner();
        return createVector(corner.x + game.settings.cellSize / 2, corner.y + game.settings.cellSize / 2);
    }

    react(ray) {
        if(this.piece !== null) {
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

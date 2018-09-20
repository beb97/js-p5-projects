class Cell {

    constructor(index) {
        this.index = index;
        this.piece = null;
    }

    draw() {
        this.drawBackGround();
    }

    drawBackGround() {
        const corner = this.getTopLeftCorner();
        fill('white');
        const borderColor = (this === game.board.getCurrentCell()) ? 'blue' : 'black';
        stroke(borderColor);
        rect(corner.x, corner.y, game.settings.cellSize, game.settings.cellSize);
    }

    drawPiece() {
        if (  this.hasPiece() ) {
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
        if(this.hasPiece()) {
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
        let current = game.board.clickedCell;
        let movingPiece = game.board.movingPiece;

        // La case cliquée contient une piéce
        if (current.hasPiece()) {
            // Et aucune piece n'est en mouvement
            if (movingPiece === null) {
                // On met en mouvement la piece de la case cliquée
                game.board.movingPiece = current.piece;
            }
            // la piéce de la case cliquée est aussi la pièce en mouvement.
            else if(current.piece === movingPiece) {
                // On annule le mouvement
                game.board.movingPiece = null;
            }
        }
        // La case cliquée ne contient pas de piece ET une piece et en mouvement
        else if ( movingPiece !== null) {
            // On pose la piece en mouvement sur la case cliquée.
            movingPiece.move(current);
        }
    }

    rightClicked() {
        if(this.hasPiece()) {
            this.piece.orientation.rotateClock();
            preventDefault();
        }
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

    hasPiece() {
        return this.piece !== null;
    }

}

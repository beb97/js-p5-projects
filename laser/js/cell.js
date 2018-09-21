class Cell {

    constructor(index) {
        this.index = index;
        this.piece = null;
        this.player = null;
    }

    draw() {
        this.drawBackGround();
    }

    drawBackGround() {
        const corner = this.getTopLeftCorner();
        const backGroundColor = this.getBackgroundColor();
        fill(backGroundColor);
        const borderColor = (this === game.board.getCurrentCell()) ? 'blue' : 'black';
        const borderWeight = (this === game.board.getCurrentCell()) ? 2 : 1;
        stroke(borderColor);
        strokeWeight(borderWeight);
        rect(corner.x, corner.y, game.settings.cellSize, game.settings.cellSize);
    }

    getBackgroundColor() {
        let backgroundColor = (this.player !== null) ? this.player.getColor(100) : 'white';
        let movingPiece = game.board.movingPiece;
        if(movingPiece && this.isValidTarget(movingPiece)) {
            backgroundColor = color(250,250,0,200);
        }
        return backgroundColor;
    }

    drawPiece() {
        if (  this.hasPiece() ) {
            this.piece.draw(this.getCenter());
        }
    }

    getTopLeftCorner() {
        return createVector(this.x() * game.settings.cellSize, this.y() * game.settings.cellSize);
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

    x() {
        return this.index % game.settings.boardwidth;
    }

    y() {
        return Math.trunc( this.index / game.settings.boardwidth);
    }

    getCoord() {
        return createVector(this.x(), this.y());
    }

    hasPiece() {
        return this.piece !== null;
    }

    isNeighboor(cell, distance = 1) {
        if (cell === this) {return false}
        return ( distance >= this.getCoord().dist( cell.getCoord())  );
    }

    isValidTarget(piece) {
        if(!piece.isMovable()) {return false;}
        if(!piece.cell.isNeighboor(this, 1.5)) {return false;}
        if(!piece.canSwap() && this.hasPiece()) {return false;}
        if(piece.canSwap() && this.hasPiece() && !this.piece.isSwapable()) {return false;}
        if(this.player !== null && this.player !== piece.player) {return false;}
        if(piece.player != game.board.player) {return false;}

        return true;
    }

}

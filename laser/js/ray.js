class Ray {

    constructor(cell, from = new Orientation(null), to = new Orientation()) {
        this.cell = cell;
        this.from = from;
        this.to = to;
    }

    draw() {
        const size = game.settings.cellSize;
        const center = this.cell.getCenter();
        stroke('red');
        // ellipse(center.x, center.y, size/2);
        if( this.from.value != null) {
            line(center.x + (size/2) * this.from.x(),
                center.y + (size/2) * this.from.y(),
                center.x, center.y);
        }

        line(center.x, center.y,
            center.x + size/2 * this.to.x(),
            center.y + size/2 * this.to.y());
    }

    block() {
        this.to = new Orientation(null);
    }

    isBlocked() {
        return this.to.value === null;
    }

    isOnPiece() {
        return (this.cell.piece !== null);
    }

    copy() {
        return new Ray(this.cell, this.from.copy(), this.to.copy());
  }

}

class Ray {

    constructor(cell, from = new Orientation(undefined), to = new Orientation()) {
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

  // getNextCell() {
  //   var nextCell = undefined;
  //   if(this.cell.piece = undefined) {
  //
  //   }
  //   var orientation = this.cell.piece.orientation;
  //   nextCell = game.board.get(
  //     this.cell.x() + orientation.x(),
  //     this.cell.y() + orientation.y());
  //
  //   return nextCell;
  // }

    copy() {
        return new Ray(this.cell, this.from.copy(), this.to.copy());
  }

}

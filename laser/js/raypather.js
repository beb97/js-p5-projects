class RayPather {

  constructor() {
    this.rayPaths = [];
  }

  draw() {
    this.rayPaths = this.generateAllRayPaths(this.getLasers());
    for( let [index, rayPath] of this.rayPaths.entries() ){
      rayPath.draw();
    }
  }

  getLasers() {
    var lasers = [];
    var cells = game.board.cells;
    for( let [index, cell] of cells.entries() ){
        if(cell.piece && cell.piece instanceof Laser) {
          lasers.push(cell);
        }
    }
    return lasers;
  }

  generateAllRayPaths(lasers) {
    var rayPaths = [];
    for( let [index, laser] of lasers.entries() ){
      rayPaths.push(this.generateRayPath(laser));
    }
    return rayPaths;
  }

  generateRayPath(laser) {

      var rayPath = new RayPath();
      rayPath.addRay(laser.piece.generateRay());

      var nextRay = this.getNextRay(rayPath);
      while ( nextRay != undefined) {
        rayPath.addRay(nextRay);
        nextRay = this.getNextRay(rayPath);
      }
      return rayPath;
  }

  getNextRay(rayPath) {
    var nextRay = undefined;
    var currentRay = rayPath.getLastRay();

    var nextCell = game.board.get(
      currentRay.cell.x() + currentRay.to.x(),
      currentRay.cell.y() + currentRay.to.y());

    if (nextCell != undefined) {
      nextRay = new Ray(nextCell);
      nextRay.from = currentRay.to.getOpposite();
      nextRay.to = currentRay.to.copy();
      // var r = random();
      // if(r > 0.9) {
      //   nextCell.piece = new Miroir(nextCell);
      // }
      // else if(r<0.2) {
      //   nextRay.to.rotateAnti();
      // }
      nextCell.react(nextRay);
    }

    return nextRay;
  }


}

class RayPath {
  constructor() {
    this.rayPath = [];
  }
  addRay(cell) {
    this.rayPath.push(cell);
  }
  getLastRay() {
    return this.rayPath[this.rayPath.length - 1];
  }
  getFirst() {
    return this.rayPath[0];
  }

  draw() {
    for( let [index, ray] of this.rayPath.entries() ){
      ray.draw();
    }
  }
}

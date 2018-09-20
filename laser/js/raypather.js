class RayPather {

    constructor() {
        this.rayPaths = [];
    }

    draw() {
        this.rayPaths = this.generateAllRayPaths(this.getLasers());
        for( let rayPath of this.rayPaths ){
            rayPath.draw();
        }
    }

    getLasers() {
        let lasers = [];
        const cells = game.board.cells;
        for( let cell of cells ){
            if(cell.piece && cell.piece instanceof Laser) {
                lasers.push(cell);
            }
        }
        return lasers;
    }

    generateAllRayPaths(lasers) {
        let rayPaths = [];
        for( let laser of lasers ){
            rayPaths.push(this.generateRayPath(laser));
        }
        return rayPaths;
    }

    generateRayPath(laser) {

        const rayPath = new RayPath();
        rayPath.addRay(laser.piece.generateRay());

        let nextRay = this.getNextRay(rayPath);
        while ( nextRay !== undefined && !nextRay.isBlocked()) {
            rayPath.addRay(nextRay);
            nextRay = this.getNextRay(rayPath);
        }
        return rayPath;
    }

    getNextRay(rayPath) {
        let nextRay = undefined;
        const currentRay = rayPath.getLastRay();

        const nextCell = game.board.get(
            currentRay.cell.x() + currentRay.to.x(),
            currentRay.cell.y() + currentRay.to.y());

        if (nextCell !== undefined) {
            nextRay = new Ray(nextCell);
            nextRay.from = currentRay.to.getOpposite();
            nextRay.to = currentRay.to.copy();
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

    draw() {
        for( let ray of this.rayPath ){
            ray.draw();
        }
    }
}

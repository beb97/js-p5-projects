class Piece {

    constructor(cell, orientation = new Orientation(), player = null) {
        this.cell = cell;
        this.orientation = orientation;
        this.player = player;
    }

    react(ray) {
        return ray;
    }

    die() {
        this.cell.piece = null;
        this.cell = null;
    }

    touchedFrom(ray) {
        return this.orientation.sub(ray.from);
    }

    move(newCell) {
        this.cell.piece = null;
        this.cell = newCell;
        this.cell.piece = this;
        game.board.movingPiece = null;
    }

    getPieceCenter() {
        let center;
        if(this.isMoving()) {
            center = this.snap(game.settings.cellSize / 3);
        } else {
            center = this.cell.getCenter()
        }
        return center;
    }

    snap(distanceRequired) {
        let center = createVector(mouseX, mouseY);
        const closestCell = game.board.getCurrentCell();
        if (closestCell) {
            const distanceFromClosestCell = closestCell.getCenter().dist(createVector(mouseX, mouseY));
            if( distanceFromClosestCell < distanceRequired ) {
                center = closestCell.getCenter();
            }

        }
        return center;
    }

    isMoving() {
        return this === game.board.movingPiece;
    }
}

class Laser extends Piece {

    constructor(cell, orientation = new Orientation()) {
        super(cell, orientation);
    }


    draw() {
        let center = this.getPieceCenter();
        let size = game.settings.cellSize;


        push();
        translate(center.x, center.y);
        strokeWeight(3);
        fill(this.cell.piece.player.color);
        ellipse(0,0, size/1.5);
        rotate(this.orientation.value);
        line(0, 0, (size/3), 0);
        pop();
    }

    generateRay() {
        return new Ray(this.cell, new Orientation(null), this.orientation.copy());
    }

}

class Mirror extends Piece {

    constructor(cell, orientation = new Orientation()) {
        super(cell, orientation);
    }

    react(ray) {

        switch (this.touchedFrom(ray)) {
            case 0:
                ray.to.rotateClock();
                break;
            case 90:
                ray.to.rotateAntiClock();
                break;
            default:
                ray.block();

        }
        return ray;
    }

    draw() {
        let center = this.getPieceCenter();
        let size = game.settings.cellSize;
        let length = size / 2;
        push();
        strokeWeight(3);
        fill(this.cell.piece.player.color);
        translate(center.x, center.y);
        rotate(this.orientation.value);
        triangle( - length, - length, -length, length, length, length);

        pop();
    }
}


class DoubleMirror extends Piece {

    constructor(cell, orientation = new Orientation()) {
        super(cell, orientation);
    }

    react(ray) {

        switch (this.touchedFrom(ray)) {
            case 0:
            case 180:
                ray.to.rotateClock();
                break;
            case 90:
            case 270:
                ray.to.rotateAntiClock();
                break;
            default:
                ray.block();

        }
        return ray;
    }

    draw() {
        let center = this.getPieceCenter();
        let size = game.settings.cellSize;
        let length = size;
        push();
        strokeWeight(3);
        fill(this.cell.piece.player.color);
        translate(center.x, center.y);
        rotate(this.orientation.value + 45);
        rectMode(CENTER);
        rect( 0,0, length, length/4);

        pop();
    }
}

class Orientation {

    constructor(value) {
        value = typeof value !== 'undefined' ? value : 0;
        this.values = { "TOP":90, "RIGHT":0, "BOT":270, "LEFT":180 };
        // this.values = { "TOP":PI/2, "RIGHT":0, "BOT":3/2*PI, "LEFT":PI };
        this.value = this.setValue(value);
    }

    getOpposite() {
        return new Orientation(this.value + 180);
    }

    rotateClock(angle = 90) {
        this.setValue( this.value + angle );
        return this;
    }

    rotateAntiClock(angle = 90) {
        this.rotateClock(-angle);
        return this;
    }

    x() {
        return round( cos(this.value), 2 );
    }

    y() {
        return round( sin(this.value), 2 );
    }

    copy() {
        return new Orientation(this.value);
    }

    setValue(newValue) {
        this.value = this.cleanValue(newValue);
        return this.value;
    }

    cleanValue(newValue) {
        if (newValue !== null ) {
            newValue = newValue % 360;
            if (newValue < 0) {
                newValue = 360 + newValue;
            }
        }
        return newValue;
    }

    sub(pOrientation) {
        return this.cleanValue(this.value - pOrientation.value);
    }

}

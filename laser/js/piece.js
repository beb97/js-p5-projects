class Piece {

    constructor(cell, orientation = new Orientation()) {
        this.cell = cell;
        this.orientation = orientation;
    }


    react(ray) {
        return ray;
    }

    die() {
        this.cell.piece = null;
    }

    touchedFrom() {
        return this.orientation.value;
    }
}

class Laser extends Piece {

    constructor(cell, orientation = new Orientation()) {
        super(cell, orientation);
    }


    draw() {
        let center = this.cell.getCenter();
        let size = game.settings.cellSize;


        push();
        translate(center.x, center.y);
        strokeWeight(3);
        ellipse(0,0, size/2);
        rotate(this.orientation.value);
        line(0, 0, (size/4), 0);
        pop();
    }

    generateRay() {
        return new Ray(this.cell, new Orientation(null), this.orientation.copy());
    }

}

class Miroir extends Piece {

    constructor(cell, orientation = new Orientation()) {
        super(cell, orientation);
    }

    react(ray) {

        switch (this.touchedFrom()) {
            case 0:
                ray.to.rotateClock();
                break;
            case 90:
                ray.to.rotateAntiClock();
                break;
            default:
                this.die();

        }
        return ray;
    }

    draw() {
        let center = this.cell.getCenter();
        let size = game.settings.cellSize;
        let length = size / 2;
        push();
        strokeWeight(3);
        fill('grey');
        translate(center.x, center.y);
        rotate(this.orientation.value);
        triangle( - length, - length, -length, length, length, length);

        pop();
    }


}

class Orientation {

    constructor(value = 0) {
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
        newValue = newValue % 360;
        if (newValue < 0) {
            newValue = 360 + newValue;
        }
        this.value = newValue;
        return this.value;
    }

}

class Piece {

  constructor(cell) {
    this.cell = cell;
    this.orientation = new Orientation();
  }

  draw() {
    this.type.draw();
  }

  react(ray) {
    return ray;
  }

}

class Laser extends Piece {

  constructor(cell) {
    super(cell);
  }

  draw() {
      var center = this.cell.getCenter();
      var size = game.settings.cellSize;
      var coef = this.orientation.getCoef();


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
  constructor(cell) {
    super(cell);
  }

  react(ray) {
    ray.to.rotate();
    return ray;
  }

  draw() {
    var center = this.cell.getCenter();
    var size = game.settings.cellSize;
    var length = size/3;
    push();
    strokeWeight(3);

    translate(center.x, center.y);
    rotate(this.orientation.value);
    line( - length, - length, length, length );

    pop();
  }
}

class Orientation {
  // var values = {TOP:1};
  constructor(value = 0) {
    this.values = { "TOP":90, "RIGHT":0, "BOT":270, "LEFT":180 };
    // this.values = { "TOP":PI/2, "RIGHT":0, "BOT":3/2*PI, "LEFT":PI };
    this.value = value;
  }

  getCoef() {
    angleMode(DEGREES);
    return createVector(this.x(),this.y());
  }

  getOpposite() {
    return new Orientation(this.value + 180);
  }

  rotate(angle = 90) {
    this.value = this.value + angle;
    return this;
  }

  rotateAnti(angle = -90) {
    this.value = this.value + angle;
    return this;
  }

  x() {
    return round(cos(this.value),2);
  }

  y() {
    return round(sin(this.value),2);
  }

  copy() {
    return new Orientation(this.value);
  }
}

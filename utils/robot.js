const orientations = ["N", "E", "S", "W"];

class Robot {
  constructor(
    maxRobotPosX,
    maxRobotPosY,
    positionX,
    positionY,
    orientation,
    instructions
  ) {
    this.maxPos = { maxRobotPosX, maxRobotPosY };
    this.currentPosition = {
      positionX: parseInt(positionX),
      positionY: parseInt(positionY),
    };
    this.orientation = orientation;
    this.instructions = instructions;
    this.lost = false;
  }
  outOfGrid(coordinate) {
    return (
      coordinate.positionX > this.maxPos.maxRobotPosX ||
      coordinate.positionX < 0 ||
      coordinate.positionY > this.maxPos.maxRobotPosY ||
      coordinate.positionY < 0
    );
  }

  executeInstruction(planet) {
    if (!this.lost) {
      this.instructions.forEach((element) => {
        switch (element) {
          case "L":
            this.turnLeft();
            break;
          case "R":
            this.turnRight();
            break;
          case "F":
            this.moveForward(planet);
            break;
        }
      });
    }
  }
  turnLeft() {
    let orientationIndex = orientations.indexOf(this.orientation);

    this.orientation =
      orientationIndex == 0
        ? orientations[3]
        : orientations[orientationIndex - 1];
  }
  turnRight() {
    let orientationIndex = orientations.indexOf(this.orientation);

    this.orientation =
      orientationIndex == 3
        ? orientations[0]
        : orientations[orientationIndex + 1];
  }
  moveForward(planet) {
    let newPosition;

    switch (this.orientation) {
      case "N":
        newPosition = {
          positionX: this.currentPosition.positionX,
          positionY: this.currentPosition.positionY + 1,
        };
        break;
      case "S":
        newPosition = {
          positionX: this.currentPosition.positionX,
          positionY: this.currentPosition.positionY - 1,
        };
        break;
      case "W":
        newPosition = {
          positionX: this.currentPosition.positionX - 1,
          positionY: this.currentPosition.positionY,
        };
        break;
      case "E":
        newPosition = {
          positionX: this.currentPosition.positionX + 1,
          positionY: this.currentPosition.positionY,
        };
        break;
    }

    if (!this.outOfGrid(newPosition)) {
      this.currentPosition = newPosition;
    } else {
      if (!planet.checkIfExistScent(this.currentPosition)) {
        planet.scents.push(this.currentPosition);
        this.lost = true;
      }
    }
  }
}

module.exports = Robot;

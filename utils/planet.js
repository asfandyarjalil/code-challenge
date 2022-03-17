class Planet {
  constructor() {
    this.scents = [];
    this.robots = [];
  }
  checkIfExistScent(coordinate) {
    let result = null;

    if (this.scents.length > 0) {
      result = this.scents.find(
        (scent) =>
          scent.positionX == coordinate.positionX &&
          scent.positionY == coordinate.positionY
      );
    }

    return result;
  }
  executeRobotsInstructions() {
    this.robots.forEach((robot) => {
      robot.executeInstruction(this);
    });
  }
  log() {
    let answer = [];
    this.robots.forEach((robot) => {
      let result = `${robot.currentPosition.positionX} ${robot.currentPosition.positionY} ${robot.orientation}`;
      result += robot.lost ? " LOST" : "";
      answer.push(result);
    });
    return answer;
  }
}
module.exports = Planet;

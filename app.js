const express = require("express");
const app = express();

const PORT = 80;

const { readInput } = require("./utils/readInput");
const Planet = require("./utils/planet");
const Robot = require("./utils/robot");

const MAX_PLANET_COORDINATES = 50;
const MAX_INSTRUCTIONS = 100;
const output = readInput("./input.txt").filter((item) => item);
const gridCoordinate = output[0].split(" ");

const maxRobotPosX = parseInt(gridCoordinate[0]);
const maxRobotPosY = parseInt(gridCoordinate[1]);

app.get("/", async (req, res) => {
  let result;
  try {
    if (
      maxRobotPosX <= MAX_PLANET_COORDINATES &&
      maxRobotPosY <= MAX_PLANET_COORDINATES
    ) {
      const mars = new Planet();
      for (let i = 1; i < output.length; i += 2) {
        const initialCoordinates = output[i].split(" ");
        const instructions = output[i + 1].split("");
        if (instructions.length <= MAX_INSTRUCTIONS) {
          const robot = new Robot(
            maxRobotPosX,
            maxRobotPosY,
            initialCoordinates[0],
            initialCoordinates[1],
            initialCoordinates[2],
            instructions
          );
          mars.robots.push(robot);
        }
        await mars.executeRobotsInstructions();
        result = await mars.log();
      }
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

"use strict";

// selectors
const main = document.querySelector("main");

// helper variables for mouse events
let move = false;
let targetID = null;

// sizing, spacing & color variables
const innerCircleXYDimensions = 40;
const outerCircleXYDimensions = 47;
const gap = 40;
const gridSize = 5; // 5x5 grid
const colors = ["#F20505", "#D97E4A", "#F2ECE4", "#8C8665"];

// screen width x height
const vw = window.innerWidth;
const vh = window.innerHeight;

// create grid coordinates
const gridPoints = generateGridCoordinates(vw / 2, vh / 2);
// console.log(gridPoints);

// set-up functions -----------------------------------------------------
function generateGridCoordinates(centerX, centerY) {
  const spacing = outerCircleXYDimensions + gap;
  const coordinates = [];
  const halfGrid = Math.floor(gridSize / 2);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = centerX + (col - halfGrid) * spacing;
      const y = centerY + (row - halfGrid) * spacing;
      coordinates.push({ x, y });
    }
  }

  return coordinates;
}

const buildCirclesHTML = () => {
  gridPoints.forEach((item, i) => {
    const outerCircle = document.createElement("div");
    const innerCircle = document.createElement("div");
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    innerCircle.classList.add("thing");
    outerCircle.classList.add("grid-outline");
    const randomX = Math.floor(Math.random() * (vw - 40));
    const randomY = Math.floor(Math.random() * (vh - 40));
    innerCircle.style.left = `${randomX}px`;
    innerCircle.style.top = `${randomY}px`;
    outerCircle.style.left = `${item.x}px`;
    outerCircle.style.top = `${item.y}px`;
    innerCircle.style.backgroundColor = randomColor;
    innerCircle.style.width = `${innerCircleXYDimensions}px`;
    innerCircle.style.height = `${innerCircleXYDimensions}px`;
    outerCircle.style.width = `${outerCircleXYDimensions}px`;
    outerCircle.style.height = `${outerCircleXYDimensions}px`;
    outerCircle.style.border = `${randomColor} 2px solid`;
    innerCircle.id = i;
    main.append(outerCircle);
    main.append(innerCircle);
  });
};

// event handlers --------------------------------------------------------
const mouseDownHandler = (e) => {
  if (e.target.classList.contains("thing")) {
    move = true;
    targetID = e.target.id;
  }
};

const mouseMoveHandler = (e) => {
  const xPos = e.pageX;
  const yPos = e.pageY;
  if (move && targetID) {
    const thing = document.getElementById(targetID);
    thing.style.top = `${yPos}px`;
    thing.style.left = `${xPos}px`;
  }
};

const mouseUpHandler = (e) => {
  move = false;
  snapToGrid(e, targetID);
  targetID = null;
};

// helper functions --------------------------------------------------------
function snapToGrid(e, targetID) {
  const closestCoordinate = gridPoints.find((xy) => {
    return (
      // checking the outer circle radius against the event coordinate
      // using pythagorean theorem
      outerCircleXYDimensions / 2 >=
      Math.sqrt((xy.x - e.pageX) ** 2 + (xy.y - e.pageY) ** 2)
    );
  });
  if (closestCoordinate) {
    const targetCircle = document.getElementById(targetID);
    // add animation
    targetCircle.classList.add("snap");
    setTimeout(() => {
      targetCircle.style.top = `${closestCoordinate.y}px`;
      targetCircle.style.left = `${closestCoordinate.x}px`;
    }, 1);
    setTimeout(() => {
      targetCircle.classList.remove("snap");
    }, 101);
  }
}

// load content
document.addEventListener("DOMContentLoaded", () => {
  buildCirclesHTML();
  document.addEventListener("mousedown", mouseDownHandler);
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
});

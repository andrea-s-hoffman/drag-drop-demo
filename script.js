"use strict";

const main = document.querySelector("main");

let move = false;
let targetID = null;
const vw = window.innerWidth;
const vh = window.innerHeight;
const colors = ["#F20505", "#D97E4A", "#F2ECE4", "#8C8665"];

const gridPoints = generateGridCoordinates(vw / 2, vh / 2);

function generateGridCoordinates(centerX, centerY, spacing = 74) {
  const gridSize = 5; // 5x5 grid
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

console.log(gridPoints);

// gridPoints.forEach((dot) => {
//   const newDot = document.createElement("div");
//   newDot.style.width = "1px";
//   newDot.style.height = "1px";
//   newDot.style.border = "1px solid black";
//   newDot.style.position = "absolute";
//   newDot.style.top = `${dot.y}px`;
//   newDot.style.left = `${dot.x}px`;
//   newDot.style.transform = "translate(-50%,-50%)";
//   main.append(newDot);
// });

for (let i = 0; i < 25; i++) {
  const newGridCircle = document.createElement("div");
  const newThing = document.createElement("div");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  newThing.classList.add("thing");
  newGridCircle.classList.add("grid-outline");
  const randomX = Math.floor(Math.random() * (vw - 40));
  const randomY = Math.floor(Math.random() * (vh - 40));
  newThing.style.left = `${randomX}px`;
  newThing.style.top = `${randomY}px`;
  newThing.style.backgroundColor = randomColor;

  newThing.id = i;
  newGridCircle.style.border = `${randomColor} 2px solid`;
  document.querySelector(".grid").append(newGridCircle);
  main.append(newThing);
}

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("thing")) {
    move = true;
    targetID = e.target.id;
  }
});

document.addEventListener("mousemove", (e) => {
  const xPos = e.pageX;
  const yPos = e.pageY;
  // console.log(xPos, yPos);
  if (move && targetID) {
    const thing = document.getElementById(targetID);
    thing.style.top = `${yPos}px`;
    thing.style.left = `${xPos}px`;
  }
});

document.addEventListener("mouseup", (e) => {
  move = false;
  snapToGrid(e, targetID);
  targetID = null;
});

function snapToGrid(e, targetID) {
  const closestCoordinate = gridPoints.find((xy) => {
    return (
      xy.x - 17 < e.pageX &&
      xy.x + 17 > e.pageX &&
      xy.y - 17 < e.pageY &&
      xy.y + 17 > e.pageY
    );
  });
  if (closestCoordinate) {
    const circle = document.getElementById(targetID);
    circle.classList.add("snap");
    setTimeout(() => {
      circle.style.top = `${closestCoordinate.y}px`;
      circle.style.left = `${closestCoordinate.x}px`;
    }, 1);
    setTimeout(() => {
      circle.classList.remove("snap");
    }, 101);
  }
}

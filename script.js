"use strict";

let move = false;
let targetID = null;
const vw = window.innerWidth;
const vh = window.innerHeight;
const colors = ["#F20505", "#D97E4A", "#F2ECE4", "#8C8665"];

for (let i = 0; i < 20; i++) {
  const newThing = document.createElement("div");
  newThing.classList.add("thing");
  const randomX = Math.floor(Math.random() * (vw - 40));
  const randomY = Math.floor(Math.random() * (vh - 40));
  newThing.style.left = `${randomX}px`;
  newThing.style.top = `${randomY}px`;
  newThing.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  newThing.id = i;
  document.querySelector("main").append(newThing);
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

document.addEventListener("mouseup", () => {
  move = false;
  targetID = null;
});

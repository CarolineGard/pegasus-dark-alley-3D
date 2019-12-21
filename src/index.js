import * as BABYLON from "@babylonjs/core/Legacy/legacy";

import Game from "./Game.js";

let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

let game = new Game(engine);
game.createInitialScene(engine, canvas); //Call the createScene function

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
  engine.resize();
});

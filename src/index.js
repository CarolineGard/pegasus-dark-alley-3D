import * as BABYLON from "@babylonjs/core/Legacy/legacy";

import Game from "./Game.js";

let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

let game = new Game(engine);
let scene = game.createInitialScene(engine, canvas); //Call the createScene function

// Register a render loop to repeatedly render the scene
// scene.executeWhenReady(() => {
engine.runRenderLoop(() => {
  scene.render();
});
// });

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
  engine.resize();
});

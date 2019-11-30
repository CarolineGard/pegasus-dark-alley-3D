import * as BABYLON from "@babylonjs/core/Legacy/legacy";

import CreateScene from "./CreateScene.js";

let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* End of the create scene function ******/
let scene = CreateScene(engine, canvas); //Call the createScene function

// Register a render loop to repeatedly render the scene
scene.executeWhenReady(() => {
  engine.runRenderLoop(() => {
    scene.render();

    var fpsLabel = document.getElementById("fpsLabel");
    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
  });
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
  engine.resize();
});

import createScene from "./createScene.js";

var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* End of the create scene function ******/
var scene = createScene(engine, canvas); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  scene.render();
});

// -Animation-
// engine.runRenderLoop(renderLoop);
// var alpha = 0;
// knot.scaling.y = 1.5;
// scene.beforeRender = () => {
//   knot.rotation.y = alpha;
//   alpha += 0.03;
// };

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
  engine.resize();
});

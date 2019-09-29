/******* Add the create scene function ******/
var createScene = (engine, canvas) => {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  camera(canvas, scene);
  light(scene);
  backgroundSphere(scene);
  ground(scene);
  playerSphere(scene);

  //engine.runRenderLoop(renderLoop);

  return scene;
};

var camera = (canvas, scene) => {
  // Add a camera to the scene and attach it to the canvas
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2.2,
    50,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  camera.lowerAlphaLimit = Math.PI / 2;
  camera.upperAlphaLimit = Math.PI / 2;
  camera.lowerBetaLimit = Math.PI / 2.2;
  camera.upperBetaLimit = Math.PI / 2.2;
};

var light = scene => {
  // Add lights to the scene
  var light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0), // (up, down, specular)
    scene
  );
  light1.intensity = 0.5;
  var light2 = new BABYLON.PointLight(
    "light2",
    new BABYLON.Vector3(0, -20, -50),
    scene
  );
  light2.intensity = 0.3;
};

var backgroundSphere = scene => {
  // Add and manipulate meshes in the scene
  //split image between sides
  var f = new BABYLON.Vector4(0.5, 0, 1, 1); // front image = half the whole image along the width
  var b = new BABYLON.Vector4(0, 0, 0.5, 1); // back image = second half along the width

  var sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    {
      diameter: 100,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      frontUVs: f,
      backUVs: b
    },
    scene
  );

  var starMaterial = new BABYLON.StandardMaterial("", scene);
  starMaterial.diffuseTexture = new BABYLON.Texture(
    "src/textures/starSky.jpg",
    scene
  );
  sphere.material = starMaterial;
};

var ground = scene => {
  var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene); // default plane
  var groundPlane = BABYLON.MeshBuilder.CreatePlane(
    "groundPlane",
    { width: 30, height: 100, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  groundPlane.setPositionWithLocalVector(new BABYLON.Vector3(0, -5, -20));
  groundPlane.rotation.x = Math.PI / 2;

  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  groundPlane.material = material;
};

var playerSphere = scene => {
  // Add and manipulate meshes in the scene
  var sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1 },
    scene
  );
  sphere.setPositionWithLocalVector(new BABYLON.Vector3(0, -4, 25));

  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(1, 0.56, 0.7);
  material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
  material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
  material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
  material.alpha = 0.9;
  sphere.material = material;
};

export default createScene;

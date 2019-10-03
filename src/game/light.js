import * as BABYLON from '@babylonjs/core';

var light = scene => {
    // Add lights to the scene
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

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

export default light;
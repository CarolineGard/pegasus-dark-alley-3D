import * as BABYLON from '@babylonjs/core';

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

export default light;
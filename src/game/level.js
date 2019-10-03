import * as BABYLON from '@babylonjs/core';

var level = scene => {
    // physics engine
    scene.enablePhysics(
        new BABYLON.Vector3(0, -9.8, 0),
        new BABYLON.CannonJSPlugin(true, 10, cannon)
    );

    var groundPlane = BABYLON.MeshBuilder.CreatePlane(
        "groundPlane",
        { width: 30, height: 100, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
        scene
    );
    groundPlane.setPositionWithLocalVector(new BABYLON.Vector3(0, -5, -20));
    groundPlane.rotation.x = Math.PI / 2;

    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.ambientColor = new BABYLON.Color3(1, 1, 1);
    groundPlane.material = material;

    var physicsImpostor = new BABYLON.PhysicsImpostor(
        groundPlane,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {
            mass: 0,
            restitution: 0.9
        },
        scene
    );
};

export default level;
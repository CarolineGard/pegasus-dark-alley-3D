import * as BABYLON from '@babylonjs/core';

var player = scene => {
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

    // Keyboard events
    var inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    // Game/Render loop
    scene.onBeforeRenderObservable.add(() => {
        if (inputMap["w"] || inputMap["ArrowUp"]) {
            sphere.position.z += 0.1
        }
        if (inputMap["a"] || inputMap["ArrowLeft"]) {
            sphere.position.x -= 0.1
        }
        if (inputMap["s"] || inputMap["ArrowDown"]) {
            sphere.position.z -= 0.1
        }
        if (inputMap["d"] || inputMap["ArrowRight"]) {
            sphere.position.x += 0.1
        }
        if (inputMap["z"]) {
            sphere.position.y += 0.5
        }
        if (sphere.position.y < -30) {
            location.reload(true);
        }
    })


    var physicsImpostor = new BABYLON.PhysicsImpostor(
        sphere,
        BABYLON.PhysicsImpostor.SphereImpostor,
        {
            mass: 1,
            friction: 0.9,
            restitution: 0.9
        },
        scene
    );
};

export default player;
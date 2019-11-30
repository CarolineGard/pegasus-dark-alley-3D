import * as BABYLON from "@babylonjs/core";

class Player {
  constructor() {
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      DEAD: false
    };
    this.points = 0;
  }

  getPoints() {
    return this.points;
  }

  setup(scene) {
    // Add and manipulate meshes in the scene
    let player = BABYLON.MeshBuilder.CreateSphere(
      "player",
      { diameter: 1 },
      scene
    );
    player.setPositionWithLocalVector(new BABYLON.Vector3(0, -4, -60));

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0.56, 0.7);
    material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    material.alpha = 0.9;

    player.material = material;

    new BABYLON.SpotLight(
      "playerLight",
      new BABYLON.Vector3(0, -4, -60),
      new BABYLON.Vector3(0, 0, 10),
      Math.PI / 3,
      2,
      scene
    );

    // Keyboard events
    let inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        function(evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        function(evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    // Game/Render loop
    scene.onBeforeRenderObservable.add(() => {
      if (inputMap["a"] || inputMap["ArrowLeft"]) {
        player.position.x -= 0.2;
      }
      if (inputMap["s"] || inputMap["ArrowDown"]) {
        player.position.z -= 0.2;
      }
      if (inputMap["d"] || inputMap["ArrowRight"]) {
        player.position.x += 0.2;
      }
      if (inputMap["z"] && player.position.y < 5) {
        this.statuses.JUMPING = true;
        player.position.y += 0.5;
      }
      if (player.position.y < -30) {
        this.statuses.DEAD = true;
        location.reload(true);
      }
    });

    let physicsImpostor = new BABYLON.PhysicsImpostor(
      player,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 0.0,
        friction: 0.3,
        restitution: 0.3
      },
      scene
    );

    scene.activeCamera.lockedTarget = player;
  }
}

export default Player;

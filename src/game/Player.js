import * as BABYLON from "@babylonjs/core";

class Player {
  constructor() {
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      DEAD: false
    };
    this.points = 0;
    this.player = null;
  }

  getPoints() {
    return this.points;
  }

  getPlayer() {
    return this.player;
  }

  setup(scene) {
    // Add and manipulate meshes in the scene
    this.player = BABYLON.MeshBuilder.CreateSphere(
      "player",
      { diameter: 1 },
      scene
    );
    this.player.setPositionWithLocalVector(new BABYLON.Vector3(0, 40, -60));

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0.56, 0.7);
    material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    material.alpha = 0.9;

    this.player.material = material;

    var playerLight = new BABYLON.SpotLight(
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
        this.player.position.x -= 0.2;
      }
      if (inputMap["s"] || inputMap["ArrowDown"]) {
        this.player.position.z -= 0.2;
      }
      if (inputMap["d"] || inputMap["ArrowRight"]) {
        this.player.position.x += 0.2;
      }
      if (inputMap["z"] && this.player.position.y < 5) {
        this.statuses.JUMPING = true;
        this.player.position.y += 0.5;
      }
      if (this.player.position.y < -30) {
        this.statuses.DEAD = true;
        // location.reload(true);
      }
    });

    this.player.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.player,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 10.0,
        friction: 0.3,
        restitution: 0.3
      },
      scene
    );
    
    scene.activeCamera.lockedTarget = this.player;
  }
}

export default Player;

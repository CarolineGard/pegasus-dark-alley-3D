import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

class Player {
  constructor() {
    this.player = null;
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      DEAD: false
    };
    this.gameStartTime = null;
    this.collectedPoints = 0;
    this.timeAlivePoints = 0;
  }

  reset() {
    this.player.dispose();
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      DEAD: false
    };
    this.gameStartTime = null;
    this.collectedPoints = 0;
    this.timeAlivePoints = 0;
  }

  getPlayer() {
    return this.player;
  }

  addPoints() {
    this.collectedPoints += 100;
  }

  getPoints() {
    return this.timeAlivePoints + this.collectedPoints;
  }

  updateTimeAlivePoints() {
    if (!this.statuses.DEAD) {
      let currentTime = new Date().getTime();
      let distance = Math.round((currentTime - this.gameStartTime) / 50);
      this.timeAlivePoints = distance;
    }
  }

  setup(scene, setCurrentGameMode) {
    this.gameStartTime = new Date().getTime();

    // Add and manipulate meshes in the scene
    this.player = BABYLON.MeshBuilder.CreateSphere(
      Math.random()
        .toString(36)
        .substring(7),
      { diameter: 1 },
      scene
    );

    this.player.setPositionWithLocalVector(new BABYLON.Vector3(0, -4, -60));
    scene.activeCamera.lockedTarget = this.player;

    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0.56, 0.7);
    material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1);
    material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    material.alpha = 0.9;

    this.player.material = material;

    let glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 0.4;
    glowLayer.addIncludedOnlyMesh(this.player);

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
      if (this.player.position.y < -70 && !this.statuses.DEAD) {
        this.statuses.DEAD = true;
        setCurrentGameMode(2);
      }
    });

    this.player.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.player,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 1.0,
        friction: 0.3,
        restitution: 0.3
      },
      scene
    );

    this.player.registerBeforeRender(() => {
      this.updateTimeAlivePoints();
    });
  }
}

export default Player;

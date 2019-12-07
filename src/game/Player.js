import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

class Player {
  constructor() {
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      DEAD: false
    };
    this.gameStartTime = null;
    this.collectedPoints = 0;
    this.timeAlivePoints = 0;
  }

  updateTimeAlivePoints() {
    var currentTime = new Date().getTime();
    let distance = Math.round((currentTime - this.gameStartTime) / 50);
    this.timeAlivePoints = distance;
  }

  getPoints() {
    return this.timeAlivePoints + this.collectedPoints;
  }

  setup(scene) {
    this.gameStartTime = new Date().getTime();
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

    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.4;
    gl.addIncludedOnlyMesh(player);

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
      if (player.position.y < -70) {
        this.statuses.DEAD = true;
        location.reload(true);
      }
    });

    player.physicsImpostor = new BABYLON.PhysicsImpostor(
      player,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 1.0,
        friction: 0.3,
        restitution: 0.3
      },
      scene
    );

    // let coin;
    // let assetsManager = new BABYLON.AssetsManager(scene);

    // let meshTask = assetsManager.addMeshTask(
    //   "skull task",
    //   "",
    //   "./src/models/",
    //   "horse.babylon"
    // );

    // // You can handle success and error on a per-task basis (onSuccess, onError)
    // meshTask.onSuccess = function(task) {
    //   console.log(task);
    //   let material1 = new BABYLON.StandardMaterial("material", scene);
    //   material1.diffuseColor = new BABYLON.Color3(1, 0.56, 0.7);
    //   material1.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //   material1.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    //   material1.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
    //   material1.alpha = 0.9;
    //   coin = task.loadedMeshes[0];
    //   coin.material = material1;
    //   coin.position = new BABYLON.Vector3(0, 0, 100);
    //   coin.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    // };

    // scene.registerBeforeRender(() => {
    //   if (coin != null) {
    //     star.position.z -= DEFAULT_MOVING_SPEED;
    //     // coin.position.z -= DEFAULT_MOVING_SPEED;
    //   }
    // });

    // let star = BABYLON.MeshBuilder.CreateSphere(
    //   "player",
    //   { diameter: 1 },
    //   scene
    // );
    let star = BABYLON.MeshBuilder.CreateCylinder(
      "cone",
      { diameter: 3, height: 0.3, tessellation: 96 },
      scene,
      true
    );

    let material2 = new BABYLON.StandardMaterial("material", scene);
    material2.diffuseColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    material2.specularColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    material2.ambientColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    material2.emissiveColor = new BABYLON.Color3(0.95, 0.7, 0.31);
    material2.alpha = 0.9;
    star.material = material2;
    star.setPositionWithLocalVector(new BABYLON.Vector3(0, -48, 150));
    star.rotate(BABYLON.Axis.Z, Math.PI / 2);
    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.4;
    gl.addIncludedOnlyMesh(star);
    scene.registerBeforeRender(() => {
      star.position.z -= DEFAULT_MOVING_SPEED;
      star.addRotation(0.01, 0, 0);
      //   star.rotation.x += 0.1;

      if (star.intersectsMesh(player, false)) {
        this.collectedPoints += 100;
        star.dispose();
      }

      this.updateTimeAlivePoints();
    });

    // star.executeOnIntersection(playerMesh, () => {
    //     console.log("collision!");
    //     star = null;
    // }, true);

    // assetsManager.load();

    scene.activeCamera.lockedTarget = player;
  }
}

export default Player;

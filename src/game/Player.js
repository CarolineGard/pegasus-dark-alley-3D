import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

const NEXT_ATTACK_WAIT_TIME = 3000;

class Player {
  constructor() {
    this.player = null;
    this.statuses = {
      RUNNING: true,
      JUMPING: false,
      ATTACK: false,
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

  setDeadStatus(status) {
    this.statuses.DEAD = status;
  }

  isAttacking() {
    return this.statuses.ATTACK;
  }

  getPlayer() {
    return this.player;
  }

  addPoints(points = 100) {
    this.collectedPoints += points;
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

  doAttack(scene) {
    this.statuses.ATTACK = true;

    let attackSound = new BABYLON.Sound(
      "attackSound",
      "./src/sounds/attack.wav",
      scene,
      function() {
        attackSound.play();
      }
    );

    let animationTorus = new BABYLON.Animation(
      "torusEasingAnimation",
      "position",
      30,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    let nextPos = this.player.position.add(new BABYLON.Vector3(0, 0, 100));

    let keysTorus = [];
    keysTorus.push({ frame: 0, value: this.player.position });
    keysTorus.push({ frame: 30, value: nextPos });
    animationTorus.setKeys(keysTorus);

    let easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASEOUT);
    animationTorus.setEasingFunction(easingFunction);
    this.player.animations.push(animationTorus);

    scene.beginAnimation(this.player, 0, 30, false);

    setTimeout(() => {
      this.statuses.ATTACK = false;
    }, NEXT_ATTACK_WAIT_TIME);
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

    let radians = 0;

    // Game/Render loop
    scene.onBeforeRenderObservable.add(() => {
      if (inputMap["a"] || inputMap["ArrowLeft"]) {
        this.player.position.x -= 0.4;
      }
      if (inputMap["s"] || inputMap["ArrowDown"]) {
        this.player.position.z -= 0.2;
      }
      if (inputMap["d"] || inputMap["ArrowRight"]) {
        this.player.position.x += 0.4;
      }
      if (inputMap["z"] && this.player.position.y < 5) {
        this.statuses.JUMPING = true;
        this.player.position.y += 0.4;
      }
      if (inputMap["x"] && !this.statuses.DEAD && !this.statuses.ATTACK) {
        this.doAttack(scene);
      }
      if (this.player.position.y < -70 && !this.statuses.DEAD) {
        this.statuses.DEAD = true;
        setCurrentGameMode(2);
      }
      //else {
      //   // Default animation
      //   radians += 0.05;

      //   if (radians >= 360) {
      //     radians = 0;
      //   }
      //   this.player.position.y += Math.abs(Math.sin(radians) * 0.5;
      // }
    });

    this.player.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.player,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 100.0,
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

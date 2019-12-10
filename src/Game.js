import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import Coins from "./game/Coins";
import GuiMenu from "./game/GuiMenu";
import GuiRestartMenu from "./game/GuiRestartMenu";
import Hud from "./game/Hud";
import Level from "./game/Level";
import Light from "./game/Light";
import Obstacles from "./game/Obstacles";
import Player from "./game/Player";
import SceneEffects from "./game/SceneEffects";
import SkyBox from "./game/Skybox";
import Trees from "./game/Trees";
import AssetsManager from "./game/AssetsManager";

import { DEFAULT_MOVING_SPEED } from "./game/constants";

class Game {
  constructor(engine) {
    this.engine = null;
    this.scene = null;
    this.level = new Level();
    this.player = new Player();
    this.obstacles = new Obstacles();
    this.trees = new Trees();
    this.coins = new Coins();
    this.assetsManager = null;

    this.currentGameMode = 0;
    this.levelIsActive = false;

    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setCurrentGameMode = this.setCurrentGameMode.bind(this);
  }

  setCurrentGameMode(gameMode) {
    this.levelIsActive = false;
    this.currentGameMode = gameMode;
  }

  startGame() {
    Hud(this.scene, this.player);

    this.level.reset();
    this.level.startMusic(this.scene);

    this.player.setup(this.scene, this.setCurrentGameMode);
    // this.obstacles.setup(
    //   this.scene,
    //   this.setCurrentGameMode,
    //   this.player,
    //   this.level
    // );
    this.trees.reset();
    this.trees.setup(this.scene);

    this.coins.setup(this.scene, this.player);

    let mesh = this.assetsManager.getMesh("skull");
    mesh.setEnabled(true);
    mesh.position.y = -50;
    mesh.position.z = 200;
    mesh.scaling = new BABYLON.Vector3(2, 2, 2);
    mesh.rotate(BABYLON.Axis.X, -Math.PI / 2);
    mesh.rotate(BABYLON.Axis.Z, Math.PI);

    //mesh.rotate(BABYLON.Axis.Z, Math.PI / 2);
    //console.log(mesh.getBoundingInfo().boundingBox);

    // var box = BABYLON.MeshBuilder.CreateBox(
    //   "box",
    //   { height: 20, width: 20, depth: 10 },
    //   this.scene
    // );
    // box.position.y = -49;
    // box.position.z = 120;

    // var getMinMax = function(mesh1) {
    //   var info = mesh1.getBoundingInfo().boundingBox;
    //   var min = info.minimumWorld;
    //   var max = info.maximumWorld;
    //   return { min: min, max: max };
    // };
    // var refreshBoundingInfo2 = (input, mesh1) => {
    //   //children[0].refreshBoundingInfo2();
    //   var mm = getMinMax(mesh1);
    //   var min = mm.min;
    //   var max = mm.max;
    //   //children[i].refreshBoundingInfo2();
    //   mm = getMinMax(mesh1);
    //   min = BABYLON.Vector3.Minimize(min, mm.min);
    //   max = BABYLON.Vector3.Maximize(max, mm.max);

    //   console.log("bounding", new BABYLON.BoundingInfo(min, max));
    //   input.setBoundingInfo(new BABYLON.BoundingInfo(min, max));
    //   return mesh;
    // };

    // console.log(box.getBoundingInfo().boundingBox);
    // mesh = refreshBoundingInfo2(mesh, box);

    // mesh.refreshBoundingInfo();
    // mesh.showBoundingBox = true;
    //mesh.material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.5)﻿;
    //mesh.setBoundingInfo(box);
    mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
      mesh,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0 }
    );

    //mesh.showBoundingBox = true;

    // this.scene.registerBeforeRender(() => {
    //   box.position.z -= DEFAULT_MOVING_SPEED;
    // });

    // box.dispose();

    this.scene.registerBeforeRender(() => {
      mesh.position.z -= DEFAULT_MOVING_SPEED;

      if (mesh.intersectsMesh(this.player.getPlayer(), false)) {
        if (this.player.isAttacking()) {
          console.log();
          console.log("INTERSECT");
        } else {
          this.setCurrentGameMode(2); // reset game
        }
      }
    });
  }

  restartGame() {
    this.level.reset();
    this.level.startMusic(this.scene);

    this.player.reset();
    this.player.setup(this.scene, this.setCurrentGameMode);

    this.obstacles.reset();
    this.obstacles.setup(
      this.scene,
      this.setCurrentGameMode,
      this.player,
      this.level
    );

    this.trees.reset();
    this.trees.setup(this.scene);

    this.coins.reset();
    this.coins.setup(this.scene, this.player);
  }

  createInitialScene(engine, canvas) {
    this.engine = engine;
    this.scene = new BABYLON.Scene(engine);
    Camera(canvas, this.scene);

    Light(this.scene);
    SkyBox(this.scene);

    this.level.setup(this.scene);
    this.trees.setup(this.scene);

    SceneEffects(this.scene);
    GuiMenu(this.startGame);

    //let scene = this.scene;

    this.scene.registerBeforeRender(() => {
      if (!this.levelIsActive) {
        if (this.currentGameMode === 0) {
        } else if (this.currentGameMode === 1) {
        } else if (this.currentGameMode === 2) {
          this.level.stopMusic();
          GuiRestartMenu(this.player, this.restartGame);
        }

        this.levelIsActive = true;
      }
    });

    const scene = this.scene;
    this.assetsManager = new AssetsManager(this.scene, () => {
      engine.runRenderLoop(function() {
        scene.render();
      });
    });

    this.assetsManager.addMesh(
      this.scene,
      this.player,
      "skull",
      "star2.babylon"
    );

    this.assetsManager.load();
  }
}

export default Game;

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
import Stars from "./game/Stars";
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
    this.stars = new Stars();
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

    this.obstacles.setup(
      this.scene,
      this.setCurrentGameMode,
      this.player,
      this.level
    );

    this.trees.reset();
    this.trees.setup(this.scene);

    this.coins.setup(this.scene, this.player);

    this.stars.setup(
      this.scene,
      this.player,
      this.assetsManager,
      this.setCurrentGameMode
    );
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

    this.stars.reEnable();
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

    this.assetsManager.addAllAssets();
    this.assetsManager.load();
  }
}

export default Game;

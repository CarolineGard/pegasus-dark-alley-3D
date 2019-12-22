import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED, INCREASE_SPEED } from "./game/constants";
import AssetsManager from "./game/AssetsManager";
import Camera from "./game/Camera";
import Coins from "./game/Coins";
import DevFpsMeter from "./game/DevFpsMeter";
import GuiMenu from "./game/GuiMenu";
import GuiRestartMenu from "./game/GuiRestartMenu";
import Hud from "./game/Hud";
import Level from "./game/Level";
import Light from "./game/Light";
import Obstacles from "./game/Obstacles";
import Player from "./game/Player";
import SceneEffects from "./game/SceneEffects";
import SkyBox from "./game/Skybox";
import Stars from "./game/Stars";
import Trees from "./game/Trees";

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

    this.movingSpeed = DEFAULT_MOVING_SPEED;
    this.currentGameMode = 0;
    this.waitingForPlayerRestart = false;

    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setCurrentGameMode = this.setCurrentGameMode.bind(this);
  }

  setCurrentGameMode(gameMode) {
    this.currentGameMode = gameMode;
  }

  startGame() {
    Hud(this.scene, this.player);

    this.level.reset();
    this.level.startMusic(this.scene);

    this.player.setup(this.scene, this.setCurrentGameMode);

    this.obstacles.setup(this.scene, this.setCurrentGameMode, this.player);

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
    this.waitingForPlayerRestart = false;
    this.player.setDeadStatus(false);
    this.setCurrentGameMode(0);
    this.movingSpeed = DEFAULT_MOVING_SPEED;

    this.level.reset();
    this.level.startMusic(this.scene);

    this.player.reset();
    this.player.setup(this.scene, this.setCurrentGameMode);

    this.obstacles.reset();
    this.obstacles.setup(this.scene, this.setCurrentGameMode, this.player);

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
    DevFpsMeter(this.scene, this.engine);

    this.scene.registerBeforeRender(() => {
      this.movingSpeed += INCREASE_SPEED;

      this.level.setMovingSpeed(this.movingSpeed);
      this.obstacles.setMovingSpeed(this.movingSpeed);
      this.trees.setMovingSpeed(this.movingSpeed);
      this.coins.setMovingSpeed(this.movingSpeed);
      this.stars.setMovingSpeed(this.movingSpeed);

      if (!this.waitingForPlayerRestart) {
        if (this.currentGameMode === 0) {
        } else if (this.currentGameMode === 1) {
        } else if (this.currentGameMode === 2) {
          this.level.stopMusic();
          var dieSound = new BABYLON.Sound(
            "dieSound",
            "./src/sounds/die.mp3",
            scene,
            function() {
              dieSound.play();
            }
          );
          GuiRestartMenu(this.player, this.restartGame);

          this.waitingForPlayerRestart = true;
        }
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

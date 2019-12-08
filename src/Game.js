import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import GuiMenu from "./game/GuiMenu";
import GuiRestartMenu from "./game/GuiRestartMenu";
import Hud from "./game/Hud";
import Level from "./game/Level";
import Light from "./game/Light";
import Player from "./game/Player";
import SceneEffects from "./game/SceneEffects";
import SkyBox from "./game/Skybox";
import Trees from "./game/Trees";
import Coins from "./game/Coins";

class Game {
  constructor(engine) {
    this.scene = null;
    this.level = new Level();
    this.player = new Player();
    this.trees = new Trees();
    this.coins = new Coins();

    this.currentLevel = 0;
    this.levelIsActive = false;

    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setCurrentLevel = this.setCurrentLevel.bind(this);
  }

  setCurrentLevel(nr) {
    this.levelIsActive = false;
    this.currentLevel = nr;
  }

  startGame() {
    Hud(this.scene, this.player);

    this.level.reset();

    this.player.setup(this.scene, this.setCurrentLevel);

    this.trees.reset();
    this.trees.setup(this.scene);
    this.coins.setup(this.scene, this.player);
  }

  restartGame() {
    this.level.reset();

    this.player.reset();
    this.player.setup(this.scene, this.setCurrentLevel);

    this.trees.reset();
    this.trees.setup(this.scene);

    this.coins.reset();
    this.coins.setup(this.scene, this.player);
  }

  createInitialScene(engine, canvas) {
    this.scene = new BABYLON.Scene(engine);
    let camera = Camera(canvas, this.scene);

    Light(this.scene);
    SkyBox(this.scene);

    this.level.setup(this.scene);
    this.trees.setup(this.scene);

    SceneEffects(this.scene);
    GuiMenu(this.startGame);

    this.scene.registerBeforeRender(() => {
      if (!this.levelIsActive) {
        if (this.currentLevel === 0) {
        } else if (this.currentLevel === 1) {
        } else if (this.currentLevel === 2) {
          GuiRestartMenu(this.player, this.restartGame);
        }

        this.levelIsActive = true;
      }
    });

    return this.scene;
  }
}

export default Game;

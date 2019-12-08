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
  constructor() {
    this.currentLevel = 0;
    this.levelIsActive = false;
    this.startGame = this.startGame.bind(this);
    this.setCurrentLevel = this.setCurrentLevel.bind(this);
  }

  setCurrentLevel(nr) {
    this.levelIsActive = false;
    this.currentLevel = nr;
  }

  startGame(scene, level, player, trees, engine) {
    console.log("startGame");
    level.reset();
    player.setup(scene, this.setCurrentLevel);
    trees.reset();
    trees.setup(scene);
    Hud(scene, player);
    Coins(scene, player);
  }

  /******* Add the create scene function ******/
  CreateScene(engine, canvas) {
    let scene = new BABYLON.Scene(engine);

    // Reduce calls to gl.clear() by disable the default scene clearing behavior
    // Safe setting since the viewport will always be 100% filled (inside skybox)
    scene.autoClear = false; // Color buffer
    scene.autoClearDepthAndStencil = false; // Depth and stencil

    let camera = Camera(canvas, scene);
    scene.activeCamera = camera;
    Light(scene);

    SkyBox(scene);
    let level = new Level();
    let player = new Player();
    let trees = new Trees();
    level.setup(scene);
    trees.setup(scene);

    SceneEffects(scene);
    GuiMenu(scene, level, player, trees, engine, this.startGame);

    scene.registerBeforeRender(() => {
      if (!this.levelIsActive) {
        if (this.currentLevel === 0) {
        } else if (this.currentLevel === 1) {
        } else if (this.currentLevel === 2) {
          console.log("gui restart");
          GuiRestartMenu(scene, level, player, trees, engine, this.startGame);
        }

        this.levelIsActive = true;
      }
    });

    return scene;
  }
}

export default Game;

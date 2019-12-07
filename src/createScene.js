import * as BABYLON from "@babylonjs/core";
import Camera from "./game/Camera";
import GuiMenu from "./game/GuiMenu";
import Hud from "./game/Hud";
import Level from "./game/Level";
import Light from "./game/Light";
import Player from "./game/Player";
import SceneEffects from "./game/SceneEffects";
import SkyBox from "./game/Skybox";
import Trees from "./game/Trees";
import Coins from "./game/Coins";

class Game {
  startGame(scene, level, player) {
    level.resetLevel();
    player.setup(scene);
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
    level.setup(scene);

    SceneEffects(scene);
    Trees(scene);
    GuiMenu(scene, level, player, this.startGame);

    return scene;
  }
}

export default Game;

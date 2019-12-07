import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import Camera from "./game/Camera";
import Light from "./game/Light";
import SkyBox from "./game/Skybox";
import Player from "./game/Player";
import Level from "./game/Level";
import SceneEffects from "./game/SceneEffects";
import Trees from "./game/Trees";
import Gui from "./game/Gui";
class Game {

  constructor() {
    this.gameStarted = false;
  }
  
  startGame() {
    console.log("gameStart");
    console.log({"game": this.gameStarted});
    this.gameStarted = true;
    this.CreateScene();
  }
  /******* Add the create scene function ******/
  CreateScene(engine, canvas) {
    let scene = new BABYLON.Scene(engine);

    console.log({"gamesTart": this.gameStarted});
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let button = GUI.Button.CreateSimpleButton("startButton", "Click to Play");



   

    console.log("post gameStarted");
    

    // Reduce calls to gl.clear() by disable the default scene clearing behavior
    // Safe setting since the viewport will always be 100% filled (inside skybox)
    scene.autoClear = false; // Color buffer
    scene.autoClearDepthAndStencil = false; // Depth and stencil

    let camera = Camera(canvas, scene);
    scene.activeCamera = camera;
    Light(scene);

    SkyBox(scene);
    let level = new Level();
    level.setup(scene);

    SceneEffects(scene);
    Trees(scene);
    if (this.gameStarted === true) {
      
 
 
     //  let scene1 = new BABYLON.Scene(engine);
     // let camera1 = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene1);
   
     //  // Make this scene transparent to see the document background
     //  //scene1.clearColor = new BABYLON.Color4(0,0,0,0);
    
     //  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
     //  let button = GUI.Button.CreateSimpleButton("startButton", "Click to Play");
     //    button.width = "150px"
     //    button.height = "40px";
     //    button.color = "white";
     //    button.cornerRadius = 20;
     //    button.background = "purple";
     //    button.onPointerUpObservable.add(() => {
     //     this.gameStarted = true;
     //     this.CreateScene();
     //    });
     //    advancedTexture.addControl(button);    
      
     //    return scene1;
    } else {
        button.width = "150px"
        button.height = "40px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "purple";
        button.onPointerUpObservable.add(() => {
          advancedTexture.removeControl(button);    
          let player = new Player();
          player.setup(scene);
             
           Gui(scene, player);
        });
        advancedTexture.addControl(button);    
    }

    return scene;
  };
}

export default Game;

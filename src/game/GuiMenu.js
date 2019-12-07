import * as GUI from "@babylonjs/gui";

const GuiMenu = (scene, startGame) => {
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);


  // Make this scene transparent to see the document background
  scene.clearColor = new BABYLON.Color4(0,0,0,0);

  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let button = GUI.Button.CreateSimpleButton("startButton", "Click to Play");
    button.width = "150px"
    button.height = "40px";
    button.color = "white";
    button.cornerRadius = 20;
    button.background = "green";
    button.onPointerUpObservable.add(() => startGame());
    advancedTexture.addControl(button);    
  // let pointsText = new GUI.TextBlock();
  // pointsText.text = player.getPoints().toString();
  // pointsText.color = "grey";
  // pointsText.fontSize = 24;
  // pointsText.left = "-40px";
  // pointsText.top = "20px";
  // pointsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  // pointsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  // advancedTexture.addControl(pointsText);

  // scene.registerBeforeRender(() => {
  //   pointsText.text = player.getPoints().toString();
  // });
};

export default GuiMenu;

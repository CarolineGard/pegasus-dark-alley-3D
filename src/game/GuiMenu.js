import * as GUI from "@babylonjs/gui";

const GuiMenu = (scene, level, player, startGame) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let button = GUI.Button.CreateSimpleButton("startButton", "Click to Play");

  button.width = "150px";
  button.height = "40px";
  button.color = "#c9c9c9";
  button.cornerRadius = 20;
  button.background = "black";
  button.onPointerUpObservable.add(() => {
    advancedTexture.removeControl(button);
    startGame(scene, level, player);
  });
  advancedTexture.addControl(button);
};

export default GuiMenu;
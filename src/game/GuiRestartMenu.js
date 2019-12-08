import * as GUI from "@babylonjs/gui";

const GuiRestartMenu = (scene, level, player, startGame) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let button = GUI.Button.CreateSimpleButton("startButton", "Restart");
  var text1 = new GUI.TextBlock();
  text1.text = "Your score was " + player.getPoints();
  text1.color = "white";
  text1.fontSize = 24;

  button.top = "70px";
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
  advancedTexture.addControl(text1);
};

export default GuiRestartMenu;

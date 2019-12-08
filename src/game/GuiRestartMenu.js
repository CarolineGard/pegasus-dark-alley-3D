import * as GUI from "@babylonjs/gui";

const GuiRestartMenu = (player, startGame) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let button = GUI.Button.CreateSimpleButton("startButton", "Restart");
  var text = new GUI.TextBlock();
  text.text = "Your score was " + player.getPoints();
  text.color = "white";
  text.fontSize = 24;
  text.top = "-70px";

  button.width = "150px";
  button.height = "40px";
  button.color = "#c9c9c9";
  button.cornerRadius = 20;
  button.background = "black";

  button.onPointerUpObservable.add(() => {
    advancedTexture.removeControl(text);
    advancedTexture.removeControl(button);
    startGame();
  });
  advancedTexture.addControl(text);
  advancedTexture.addControl(button);
};

export default GuiRestartMenu;

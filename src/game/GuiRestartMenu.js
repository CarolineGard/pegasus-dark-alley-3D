import * as GUI from "@babylonjs/gui";

const GuiRestartMenu = (
  scene,
  level,
  player,
  trees,
  coins,
  engine,
  startGame
) => {
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

  console.log("set gui");

  button.onPointerUpObservable.add(() => {
    console.log("onPointerObservable");
    advancedTexture.removeControl(text);
    advancedTexture.removeControl(button);
    startGame(scene, level, player, trees, coins, engine);
  });
  advancedTexture.addControl(text);
  advancedTexture.addControl(button);
};

export default GuiRestartMenu;

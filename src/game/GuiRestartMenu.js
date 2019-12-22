import * as GUI from "@babylonjs/gui";

const QUOTES = [
  "The apocalypse is approaching, we have no time to waste.",
  "They said they saw light in horizon before they disappeared. Run. Now.",
  "The deep misery soon reaches everyone. Be quick before everything was in vain.",
  "The endlessness of darkness is increasing faster, we must hurry!",
  "A killed horse is the beginning of what’s behind someones mind. Go.",
  "Can we escape it? The darkseekers are near. You are not fast enough. Run!"
];

const GuiRestartMenu = (player, startGame) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "RestartUi"
  );

  let background = new GUI.Rectangle();
  background.width = "800px";
  background.height = "400px";
  background.cornerRadius = 3;
  background.opacity = 0.1;
  background.thickness = 0;
  background.background = "black";
  advancedTexture.addControl(background);

  let header = new GUI.TextBlock();
  header.text = "DEAD.";
  header.color = "white";
  header.top = "-100px";
  header.fontSize = 28;
  header.fontFamily = "Courier New";
  background.addControl(header);

  let text = new GUI.TextBlock();
  text.width = "300px";
  text.height = "50px";
  text.fontFamily = "Courier New";
  text.text = "Your score was " + player.getPoints();
  text.color = "white";
  text.fontSize = 20;
  text.top = "-30px";
  background.addControl(text);

  const quoteNumber = Math.floor(Math.random() * 5);

  let text2 = new GUI.TextBlock();
  text2.height = "50px";
  text2.fontFamily = "Courier New";
  text2.text = QUOTES[quoteNumber];
  text2.color = "white";
  text2.fontSize = 14;
  text2.top = "20px";
  background.addControl(text2);

  let button = GUI.Button.CreateSimpleButton("startButton", "Restart");
  button.width = "150px";
  button.height = "40px";
  button.fontFamily = "Courier New";
  button.color = "white";
  button.top = "90px";
  button.cornerRadius = 3;
  button.background = "black";
  background.addControl(button);

  button.onPointerUpObservable.add(() => {
    advancedTexture.removeControl(background);
    advancedTexture.removeControl(button);
    startGame();
  });
};

export default GuiRestartMenu;

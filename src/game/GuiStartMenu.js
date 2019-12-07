import * as GUI from "@babylonjs/gui";

const GuiMenu = scene => {
  // var result = new BABYLON.GUI.Button("button");
  let result = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  // Adding text
  var textBlock = new GUI.TextBlock("button", "hej");
  textBlock.textWrapping = true;
  textBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  textBlock.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  result.addControl(textBlock);

  var textBlock = new GUI.TextBlock("button", "hej");

  let description = new GUI.TextBlock();
  description.text = "hej";
  description.color = "white";
  description.fontSize = 24;
  description.left = "-40px";
  description.top = "20px";
  description.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  description.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  result.addControl(description);

  scene.registerBeforeRender(() => {
    // pointsText.text = player.getPoints().toString();
  });
};

export default GuiMenu;

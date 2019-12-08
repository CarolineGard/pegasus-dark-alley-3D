import * as GUI from "@babylonjs/gui";

const Gui = (scene, player) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  let pointsText = new GUI.TextBlock();
  pointsText.text = player.getPoints().toString();
  pointsText.color = "grey";
  pointsText.fontSize = 24;
  pointsText.left = "-40px";
  pointsText.top = "20px";
  pointsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  pointsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(pointsText);

  advancedTexture.registerBeforeRender(() => {
    pointsText.text = player.getPoints().toString();
  });
};

export default Gui;

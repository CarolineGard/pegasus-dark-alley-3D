import * as GUI from "@babylonjs/gui";

const Hud = (scene, player) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("HudUi");

  let pointsText = new GUI.TextBlock();
  pointsText.text = player.getPoints().toString();
  pointsText.color = "grey";
  pointsText.fontSize = 24;
  pointsText.top = "-160px";
  pointsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  pointsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  advancedTexture.addControl(pointsText);

  scene.registerBeforeRender(() => {
    pointsText.text = player.getPoints().toString();
  });
};

export default Hud;

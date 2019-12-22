import * as GUI from "@babylonjs/gui";

const Hud = (scene, player) => {
  let advancedTexture = Hud.CreateFullscreenUI("HudUi");

  let pointsText = new GUI.TextBlock();
  pointsText.text = player.getPoints().toString();
  pointsText.color = "grey";
  pointsText.fontSize = 24;
  pointsText.left = "-40px";
  pointsText.top = "20px";
  pointsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  pointsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(pointsText);

  scene.registerBeforeRender(() => {
    pointsText.text = player.getPoints().toString();
  });
};

export default Hud;

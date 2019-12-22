import * as GUI from "@babylonjs/gui";

const DevFpsMeter = (scene, engine) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "DevFpsMeterUi"
  );

  let fpsText = new GUI.TextBlock();
  fpsText.color = "grey";
  fpsText.fontSize = 24;
  fpsText.top = "-200px";
  fpsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  fpsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  advancedTexture.addControl(fpsText);

  scene.registerBeforeRender(() => {
    fpsText.text = `${Math.round(engine.getFps())} fps`;
  });
};

export default DevFpsMeter;

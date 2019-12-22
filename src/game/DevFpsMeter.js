import * as GUI from "@babylonjs/gui";

const DevFpsMeter = (scene, engine) => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "DevFpsMeterUi"
  );

  let fpsText = new GUI.TextBlock();
  fpsText.color = "grey";
  fpsText.fontSize = 24;
  fpsText.left = "-40px";
  fpsText.top = "50px";
  fpsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  fpsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(fpsText);

  scene.registerBeforeRender(() => {
    fpsText.text = `${Math.round(engine.getFps())} fps`;
  });
};

export default DevFpsMeter;

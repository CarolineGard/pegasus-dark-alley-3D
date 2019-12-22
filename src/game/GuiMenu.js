import * as GUI from "@babylonjs/gui";

const GuiMenu = startGame => {
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("MenuUi");

  let background = new GUI.Rectangle();
  background.width = "800px";
  background.height = "550px";
  background.cornerRadius = 3;
  background.opacity = 0.1;
  background.thickness = 0;
  background.background = "black";
  advancedTexture.addControl(background);

  let header = new GUI.TextBlock();
  header.text = "PEGASUS DARK ALLEY 3D";
  header.color = "white";
  header.top = "-160px";
  header.fontSize = 28;
  header.fontFamily = "Courier New";
  background.addControl(header);

  let text1 = new GUI.TextBlock();
  text1.text =
    "In a world where the lights have started to fade, there is only one way out.";
  text1.color = "white";
  text1.fontSize = 14;
  text1.top = "-100px";
  text1.fontFamily = "Courier New";
  background.addControl(text1);

  let text2 = new GUI.TextBlock();
  text2.text = "Escape. Fast.";
  text2.color = "white";
  text2.fontSize = 16;
  text2.top = "-70px";
  text2.fontFamily = "Courier New";
  background.addControl(text2);

  let button = GUI.Button.CreateSimpleButton("startButton", "START");
  button.width = "150px";
  button.height = "50px";
  button.fontFamily = "Courier New";
  button.color = "white";
  button.cornerRadius = 3;
  button.background = "black";
  button.onPointerUpObservable.add(() => {
    advancedTexture.removeControl(background);
    advancedTexture.removeControl(button);
    startGame();
  });
  advancedTexture.addControl(button);

  // Controls
  let panel_control_row1 = new GUI.StackPanel();
  panel_control_row1.isVertical = false;
  background.addControl(panel_control_row1);

  // Controll Z
  let controlZ_box = new GUI.Rectangle();
  controlZ_box.adaptWidthToChildren = true;
  controlZ_box.height = "40px";
  controlZ_box.width = "40px";
  controlZ_box.top = "100px";
  controlZ_box.cornerRadius = 3;
  controlZ_box.color = "white";
  controlZ_box.thickness = 1;
  controlZ_box.background = "black";
  panel_control_row1.addControl(controlZ_box);

  let controlZ_text = new GUI.TextBlock();
  controlZ_text.text = "Z";
  controlZ_text.fontFamily = "Courier New";
  controlZ_text.color = "white";
  controlZ_text.width = "40px";
  controlZ_text.fontSize = 20;
  controlZ_box.addControl(controlZ_text);

  let controlZ_box2 = new GUI.Rectangle();
  controlZ_box2.adaptWidthToChildren = true;
  controlZ_box2.height = "40px";
  controlZ_box2.width = "40px";
  controlZ_box2.top = "100px";
  controlZ_box2.thickness = 0;
  panel_control_row1.addControl(controlZ_box2);

  let controlZ_description = new GUI.TextBlock();
  controlZ_description.text = "- Jump";
  controlZ_description.fontFamily = "Courier New";
  controlZ_description.color = "white";
  controlZ_description.width = "118px";
  controlZ_description.fontSize = 20;
  controlZ_box2.addControl(controlZ_description);

  // Control X
  let controlX_box = new GUI.Rectangle();
  controlX_box.adaptWidthToChildren = true;
  controlX_box.height = "40px";
  controlX_box.width = "40px";
  controlX_box.top = "100px";
  controlX_box.cornerRadius = 3;
  controlX_box.color = "white";
  controlX_box.thickness = 1;
  controlX_box.background = "black";
  panel_control_row1.addControl(controlX_box);

  let controlX_text = new GUI.TextBlock();
  controlX_text.text = "X";
  controlX_text.fontFamily = "Courier New";
  controlX_text.color = "white";
  controlX_text.width = "40px";
  controlX_text.fontSize = 20;
  controlX_box.addControl(controlX_text);

  let controlX_box2 = new GUI.Rectangle();
  controlX_box2.adaptWidthToChildren = true;
  controlX_box2.height = "40px";
  controlX_box2.width = "40px";
  controlX_box2.top = "100px";
  controlX_box2.thickness = 0;
  panel_control_row1.addControl(controlX_box2);

  let controlX_description = new GUI.TextBlock();
  controlX_description.text = "- Attack";
  controlX_description.fontFamily = "Courier New";
  controlX_description.color = "white";
  controlX_description.width = "120px";
  controlX_description.fontSize = 20;
  controlX_box2.addControl(controlX_description);

  // Control left
  let panel_control_row2 = new GUI.StackPanel();
  panel_control_row2.isVertical = false;
  panel_control_row2.top = "100px";
  background.addControl(panel_control_row2);

  let controlLeft_box = new GUI.Rectangle();
  controlLeft_box.adaptWidthToChildren = true;
  controlLeft_box.height = "40px";
  controlLeft_box.width = "40px";
  controlLeft_box.top = "70px";
  controlLeft_box.cornerRadius = 3;
  controlLeft_box.color = "white";
  controlLeft_box.thickness = 1;
  controlLeft_box.background = "black";
  panel_control_row2.addControl(controlLeft_box);

  let controlLeft_text = new GUI.TextBlock();
  controlLeft_text.text = "<";
  controlLeft_text.fontFamily = "Courier New";
  controlLeft_text.color = "white";
  controlLeft_text.width = "40px";
  controlLeft_text.fontSize = 20;
  controlLeft_box.addControl(controlLeft_text);

  let controlLeft_box2 = new GUI.Rectangle();
  controlLeft_box2.adaptWidthToChildren = true;
  controlLeft_box2.height = "40px";
  controlLeft_box2.width = "40px";
  controlLeft_box2.top = "70px";
  controlLeft_box2.thickness = 0;
  panel_control_row2.addControl(controlLeft_box2);

  let controlLeft_description = new GUI.TextBlock();
  controlLeft_description.text = "- Left";
  controlLeft_description.fontFamily = "Courier New";
  controlLeft_description.color = "white";
  controlLeft_description.width = "102px";
  controlLeft_description.fontSize = 20;
  controlLeft_box2.addControl(controlLeft_description);

  // Control right
  let controlRight_space = new GUI.Rectangle();
  controlRight_space.adaptWidthToChildren = true;
  controlRight_space.height = "40px";
  controlRight_space.width = "17px";
  controlRight_space.cornerRadius = 3;
  controlRight_space.thickness = 0;
  panel_control_row2.addControl(controlRight_space);

  let controlRight_box = new GUI.Rectangle();
  controlRight_box.adaptWidthToChildren = true;
  controlRight_box.height = "40px";
  controlRight_box.width = "40px";
  controlRight_box.top = "70px";
  controlRight_box.cornerRadius = 3;
  controlRight_box.color = "white";
  controlRight_box.thickness = 1;
  controlRight_box.background = "black";
  panel_control_row2.addControl(controlRight_box);

  let controlRight_text = new GUI.TextBlock();
  controlRight_text.text = ">";
  controlRight_text.fontFamily = "Courier New";
  controlRight_text.color = "white";
  controlRight_text.width = "40px";
  controlRight_text.fontSize = 20;
  controlRight_box.addControl(controlRight_text);

  let controlRight_box2 = new GUI.Rectangle();
  controlRight_box2.adaptWidthToChildren = true;
  controlRight_box2.height = "40px";
  controlRight_box2.width = "40px";
  controlRight_box2.top = "70px";
  controlRight_box2.thickness = 0;
  panel_control_row2.addControl(controlRight_box2);

  let controlRight_description = new GUI.TextBlock();
  controlRight_description.text = "- Right";
  controlRight_description.fontFamily = "Courier New";
  controlRight_description.color = "white";
  controlRight_description.width = "120px";
  controlRight_description.fontSize = 20;
  controlRight_box2.addControl(controlRight_description);
};

export default GuiMenu;

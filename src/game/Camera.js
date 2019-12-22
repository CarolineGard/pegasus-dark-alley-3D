import * as BABYLON from "@babylonjs/core";

const Camera = (canvas, scene) => {
  // Add a camera to the scene and attach it to the canvas
  let camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    Math.PI / 2.4,
    20,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(0, 50, 0));
  camera.lowerAlphaLimit = -Math.PI / 2;
  camera.upperAlphaLimit = -Math.PI / 2;
  camera.lowerBetaLimit = Math.PI / 2.2;
  camera.upperBetaLimit = Math.PI / 2.2;

  camera.maxZ = 2000;

  scene.activeCamera = camera;

  // Lens effects
  // var lensEffect = new BABYLON.LensRenderingPipeline(
  //   "lens",
  //   {
  //     edge_blur: 4.0,
  //     chromatic_aberration: 2.0,
  //     distortion: 0.8,
  //     dof_focus_distance: 30,
  //     dof_aperture: 1.0, // tilt-shift effect
  //     grain_amount: 1.0,
  //     dof_pentagon: true,
  //     dof_gain: 3.0,
  //     dof_threshold: 5.0,
  //     dof_darken: 0.4
  //   },
  //   scene,
  //   1.0,
  //   camera
  // );
  var lensEffect = new BABYLON.LensRenderingPipeline(
    "lens",
    {
      edge_blur: 4.0,
      chromatic_aberration: 2.0,
      distortion: 0.8,
      dof_focus_distance: 40,
      dof_aperture: 1.0, // tilt-shift effect
      grain_amount: 1.0,
      dof_pentagon: true,
      dof_gain: 3.0,
      dof_threshold: 5.0,
      dof_darken: 0.4
    },
    scene,
    1.0,
    camera
  );

  camera.attachControl(canvas, true);

  return camera;
};

export default Camera;

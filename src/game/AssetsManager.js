import * as BABYLON from "@babylonjs/core";

class AssetsManager {
  constructor(scene, finishCallback) {
    this.assetsManager = new BABYLON.AssetsManager(scene);
    this.meshes = {};

    this.assetsManager.onFinish = tasks => {
      if (finishCallback) finishCallback(tasks);
    };
  }

  addAllAssets() {
    this.addMesh("skull", "star2.babylon");
  }

  addMesh(name, fileName) {
    var meshTask = this.assetsManager.addMeshTask(
      name,
      "",
      "./src/models/",
      fileName
    );

    meshTask.onSuccess = task => {
      task.loadedMeshes[0].setEnabled(false);
      this.meshes = { ...this.meshes, [name]: task.loadedMeshes[0] };
      console.log("m", this.meshes);
    };
  }

  getMesh(name) {
    console.log(this.meshes);
    return this.meshes[name];
  }

  load() {
    this.assetsManager.load();
  }
}

export default AssetsManager;

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
    this.addMesh("star", "star.babylon");
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
    };
  }

  getMesh(name) {
    return this.meshes[name];
  }

  load() {
    this.assetsManager.load();
  }
}

export default AssetsManager;

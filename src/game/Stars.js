import * as BABYLON from "@babylonjs/core";
import { DEFAULT_MOVING_SPEED } from "./constants";

const NUMBER_OF_STARS = 5;
const INITIAL_STAR_OFFSET = 50;
const DISTANCE_BETWEEN_STARS = 500;
const BEHIND_CAMERA_POSITION = -150;
const UPDATE_POSITION =
  INITIAL_STAR_OFFSET + NUMBER_OF_STARS * DISTANCE_BETWEEN_STARS;

class Stars {
  constructor() {
    this.stars = [];
    this.movingSpeed = DEFAULT_MOVING_SPEED;
  }

  reEnable() {
    this.stars.forEach((star, i) => {
      star.setEnabled(true);

      let xPos = Math.floor(Math.random() * 20) + 10;
      xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      let zPos = (i + 1) * DISTANCE_BETWEEN_STARS + INITIAL_STAR_OFFSET;

      star.position.x = xPos;
      star.position.z = zPos;
    });
  }

  hideStar(star) {
    this.stars.map(x => {
      if (x.id === star.id) {
        x.setEnabled(false);
      }
      return x;
    });
  }

  setMovingSpeed(updatedSpeed) {
    this.movingSpeed = updatedSpeed;
  }

  setup(scene, player, assetsManager, setCurrentGameMode) {
    let glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 0.5;

    let sampleStar = assetsManager.getMesh("star");

    let coinMaterial = new BABYLON.StandardMaterial("material", scene);
    coinMaterial.diffuseColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.specularColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.ambientColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    coinMaterial.emissiveColor = new BABYLON.Color3(0.58, 0.39, 0.63);
    sampleStar.material = coinMaterial;

    glowLayer.addIncludedOnlyMesh(sampleStar);

    sampleStar.setEnabled(true);

    sampleStar.setPositionWithLocalVector(new BABYLON.Vector3(0, -50, 200));
    sampleStar.scaling = new BABYLON.Vector3(2, 2, 2);
    sampleStar.rotate(BABYLON.Axis.X, -Math.PI / 2);
    sampleStar.rotate(BABYLON.Axis.Z, Math.PI);

    sampleStar.physicsImpostor = new BABYLON.PhysicsImpostor(
      sampleStar,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0 }
    );

    for (let i = 0; i < NUMBER_OF_STARS; i++) {
      let star = sampleStar.clone(`newStar${i}`);

      let xPos = Math.floor(Math.random() * 20) + 10;
      xPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      let zPos = (i + 1) * DISTANCE_BETWEEN_STARS + INITIAL_STAR_OFFSET;

      star.position.x = xPos;
      star.position.z = zPos;

      glowLayer.addIncludedOnlyMesh(star);

      scene.registerBeforeRender(() => {
        if (star.position.z < BEHIND_CAMERA_POSITION) {
          star.setEnabled(true);
          star.position.z = UPDATE_POSITION;
        } else {
          star.position.z -= this.movingSpeed;
        }

        if (star.intersectsMesh(player.getPlayer(), false)) {
          if (player.isAttacking()) {
            var starCrushSound = new BABYLON.Sound(
              "starCrushSound",
              "./src/sounds/crush.mp3",
              scene,
              function() {
                starCrushSound.play();
              }
            );
            player.addPoints(1000);
            this.hideStar(star);
          } else {
            player.setDeadStatus(true);
            setCurrentGameMode(2);
          }
        }
      });

      this.stars.push(star);
    }
    sampleStar.dispose();
  }
}

export default Stars;

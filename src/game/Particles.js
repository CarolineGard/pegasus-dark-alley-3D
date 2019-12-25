import * as BABYLON from "@babylonjs/core";

const DEFAULT_PARTICLE_UPDATE_SPEED = 0.001;

class Particles {
  constructor() {
    this.particleSpeed = DEFAULT_PARTICLE_UPDATE_SPEED;
    this.particleSystem = null;
  }

  setMovingSpeed(updatedSpeed) {
    const updatedParticleSpeed = DEFAULT_PARTICLE_UPDATE_SPEED / updatedSpeed;
    this.particleSpeed = updatedParticleSpeed;
  }

  setup(scene) {
    // Create a particle system
    this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    this.particleSystem.particleTexture = new BABYLON.Texture(
      "src/textures/flare.png",
      scene
    );

    // Where the particles come from
    this.particleSystem.emitter = new BABYLON.Vector3(0, -20, 100); // the starting location

    // Colors of all particles
    this.particleSystem.color1 = new BABYLON.Color4(247, 202, 24);
    this.particleSystem.color2 = new BABYLON.Color4(255, 246, 143);
    this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    this.particleSystem.minSize = 0.1;
    this.particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    this.particleSystem.minLifeTime = 0.3;
    this.particleSystem.maxLifeTime = 1.5;

    // Emission rate
    this.particleSystem.emitRate = 2000;
    const direction1 = new BABYLON.Vector3(0, 0, 0);
    const direction2 = new BABYLON.Vector3(0, 0, -100);
    const minEmitBox = new BABYLON.Vector3(-125, -35, -2.5);
    const maxEmitBox = new BABYLON.Vector3(125, 35, 2.5);

    /******* Emission Space ********/
    this.particleSystem.createBoxEmitter(
      direction1,
      direction2,
      minEmitBox,
      maxEmitBox
    );

    // Speed
    this.particleSystem.minEmitPower = 10;
    this.particleSystem.maxEmitPower = 6;
    this.particleSystem.updateSpeed = this.particleSpeed;

    // Start the particle system
    this.particleSystem.start();

    // Render Loop
    scene.registerBeforeRender(() => {
      this.particleSystem.updateSpeed = this.particleSpeed;
    });
  }

  reset() {
    this.particleSpeed = DEFAULT_PARTICLE_UPDATE_SPEED;
  }
}

export default Particles;

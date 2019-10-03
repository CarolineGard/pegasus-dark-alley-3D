import * as BABYLON from '@babylonjs/core';

var backgroundSphere = scene => {
    // Add and manipulate meshes in the scene
    //split image between sides
    var f = new BABYLON.Vector4(0.5, 0, 1, 1); // front image = half the whole image along the width
    var b = new BABYLON.Vector4(0, 0, 0.5, 1); // back image = second half along the width

    var sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        {
            diameter: 100,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            frontUVs: f,
            backUVs: b
        },
        scene
    );

    var starMaterial = new BABYLON.StandardMaterial("", scene);
    starMaterial.diffuseTexture = new BABYLON.Texture(
        "src/textures/starSky.jpg",
        scene
    );
    sphere.material = starMaterial;
};

export default backgroundSphere;
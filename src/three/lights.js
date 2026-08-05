import * as THREE from "three";

export function addLights(scene){

    const ambient = new THREE.AmbientLight(0xffffff,2);

    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff,5);

    directional.position.set(5,5,5);

    scene.add(directional);

}
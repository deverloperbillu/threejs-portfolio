import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const orbGroup = new THREE.Group();

export const baseRotation = {
    x: THREE.MathUtils.degToRad(18),
    y: THREE.MathUtils.degToRad(-55),
    z: THREE.MathUtils.degToRad(8)
};

let orb = null;
let mixer = null;
let isScrolling = false;

export function setIsScrolling(value) {
    isScrolling = value;
}

export function getIsScrolling() {
    return isScrolling;
}

export function loadOrb(scene) {

    scene.add(orbGroup);

    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {

        loader.load(

            "/models/gradient-animated-001.glb",

            (gltf) => {

                orb = gltf.scene;

                orbGroup.add(orb);

                orbGroup.position.set(2.9, 0.1, 0);
                orbGroup.scale.set(0.5, 0.5, 0.5);

                orb.rotation.set(
                    baseRotation.x,
                    baseRotation.y,
                    baseRotation.z
                );

                if (gltf.animations.length > 0) {

                    mixer = new THREE.AnimationMixer(orb);

                    gltf.animations.forEach((clip) => {

                        mixer.clipAction(clip).play();

                    });

                }

                resolve({
                    orb,
                    orbGroup,
                    mixer,
                    baseRotation,
                    getIsScrolling,
                    setIsScrolling
                });

            },

            undefined,

            reject

        );

    });

}
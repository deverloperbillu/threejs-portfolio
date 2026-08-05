import * as THREE from "three";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export function loadEnvironment(scene){

    new RGBELoader().load("/hdr/studio.hdr",(texture)=>{

        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;

        scene.background = null;

    });

}
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

gsap.registerPlugin(ScrollTrigger);

// HTML
document.querySelector("#app").innerHTML = `
<section class="hero">

    <canvas id="webgl"></canvas>

    <div class="hero-content">

        <h1 class="title">
            WE BUILD DIGITAL EXPERIENCES
        </h1>

        <p class="desc">
            Three.js + GSAP Learning
        </p>

        <button class="btn">
            Explore
        </button>

    </div>

</section>

<section class="about"></section>
`;


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;

// Canvas
const canvas = document.querySelector("#webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;


// ---------------- Geometry ----------------

const geometry = new THREE.IcosahedronGeometry(1.4, 32);

// Save original vertices


// ---------------- Material ----------------

// ---------------- Material ----------------

const material = new THREE.ShaderMaterial({

    uniforms: {
        uTime: { value: 0 }
    },

    vertexShader: `
        uniform float uTime;

        varying vec3 vNormal;
        varying vec3 vPosition;

        void main(){

            vNormal = normal;

            vec3 pos = position;

            float wave1 = sin(pos.x * 5.0 + uTime * 2.0);
            float wave2 = cos(pos.y * 5.0 + uTime * 2.5);
            float wave3 = sin(pos.z * 5.0 + uTime * 3.0);

            float displacement = (wave1 + wave2 + wave3) * 0.08;

            pos += normal * displacement;

            vPosition = pos;

            gl_Position =
                projectionMatrix *
                modelViewMatrix *
                vec4(pos,1.0);

        }
    `,

    fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main(){

            vec3 color1 = vec3(0.15,0.2,1.0);
            vec3 color2 = vec3(0.0,1.0,1.0);
            vec3 color3 = vec3(1.0,0.2,0.8);

            float gradient = sin(vPosition.y * 4.0) * 0.5 + 0.5;

            vec3 color = mix(color1, color2, gradient);

            color = mix(color, color3, abs(vNormal.z));

            gl_FragColor = vec4(color,1.0);

        }
    `

});



// ---------------- Mesh ----------------

const orb = new THREE.Mesh(geometry, material);

scene.add(orb);


// ---------------- Mouse ----------------

const mouse = {

    x: 0,

    y: 0

};

window.addEventListener("mousemove", (e) => {

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;

    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

});


// ---------------- Lights ----------------

const ambient = new THREE.AmbientLight(0xffffff, 2);

scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 5);

directional.position.set(5, 5, 5);

scene.add(directional);


// ---------------- Animate ----------------

function animate(){

    requestAnimationFrame(animate);

    material.uniforms.uTime.value += 0.02;

    orb.rotation.y += (mouse.x * 0.5 - orb.rotation.y) * 0.05;
    orb.rotation.x += (mouse.y * 0.3 - orb.rotation.x) * 0.05;

    orb.position.y = Math.sin(performance.now() * 0.002) * 0.15;

    renderer.render(scene, camera);

}

animate();


// ---------------- Resize ----------------

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
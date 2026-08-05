// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0.3, 5.4);

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


const loader = new GLTFLoader();

let orb;
let mixer;

const baseRotation = {
    x: THREE.MathUtils.degToRad(18),
    y: THREE.MathUtils.degToRad(-55),
    z: THREE.MathUtils.degToRad(8)
};

const orbGroup = new THREE.Group();

scene.add(orbGroup);

let isScrolling = false;

loader.load("/models/gradient-animated-001.glb", (gltf) => {

    orb = gltf.scene;

    orbGroup.add(orb);

    // Initial Transform
    orbGroup.position.set(2.9, 0.1, 0);
    orbGroup.scale.set(0.5, 0.5, 0.5);

    orb.rotation.set(
        baseRotation.x,
        baseRotation.y,
        baseRotation.z
    );

    // ---------------- Intro ----------------

    const intro = gsap.timeline();

    intro
        .from(".title", {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
        .from(".desc", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".btn", {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.5");

    // ---------------- Scroll ----------------

    gsap.timeline({

        scrollTrigger: {

            id: "hero",

            trigger: ".hero",

            start: "top top",

            end: "+=2500",

            scrub: 1.5,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            onEnter: () => isScrolling = true,
            onLeave: () => isScrolling = false,
            onEnterBack: () => isScrolling = true,
            onLeaveBack: () => isScrolling = false

        }

    })

    // Camera Zoom
    .to(camera.position, {

        z: 2.3,
        duration: 1

    }, 0)

    // Orb Rotation
    .to(orb.rotation, {

        y: baseRotation.y + Math.PI * 2,
        x: baseRotation.x + 0.8,
        duration: 1

    }, 0)

    // Orb Move
    .to(orbGroup.position, {

        x: 1.5,
        y: 0,
        duration: 1

    }, 0)

    // Text Fade
    .to(".hero-content", {

        opacity: 0,
        y: -120,
        duration: 0.8

    }, 0);

    // ---------------- GLB Animations ----------------

    if (gltf.animations.length > 0) {

        mixer = new THREE.AnimationMixer(orb);

        gltf.animations.forEach((clip) => {

            mixer.clipAction(clip).play();

        });

    }

});

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


new RGBELoader().load("/hdr/studio.hdr", (texture) => {

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = texture;

    scene.background = null;

});


// ---------------- Animate ----------------

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    if (orb) {

    if (!isScrolling) {

        const targetRotX = baseRotation.x + mouse.y * 0.18;
        const targetRotY = baseRotation.y + mouse.x * 0.35;

        orb.rotation.x += (targetRotX - orb.rotation.x) * 0.05;
        orb.rotation.y += (targetRotY - orb.rotation.y) * 0.05;

        const time = performance.now() * 0.001;

        const targetX = 2.9 + mouse.x * 0.25;
        const targetY = -0.2 + mouse.y * 0.12 + Math.sin(time * 1.2) * 0.08;

        orbGroup.position.x += (targetX - orbGroup.position.x) * 0.05;
        orbGroup.position.y += (targetY - orbGroup.position.y) * 0.05;
    }

    orb.rotation.z += 0.002;
}

    renderer.render(scene, camera);

}

animate();

// ---------------- Resize ----------------

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});




const track = document.querySelector(".projects-track");

gsap.to(track,{
    x: () => -(track.scrollWidth - window.innerWidth + 150),
    ease:"none",
    scrollTrigger:{
        trigger:".showcase",
        start:"top top",
        end:() => "+=" + track.scrollWidth,
        scrub:true,
        pin:true
    }
});
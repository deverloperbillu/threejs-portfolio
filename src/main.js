import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scene, camera, createRenderer } from "./three/scene";
import { addLights } from "./three/lights";
import { loadEnvironment } from "./three/environment";
import { loadOrb } from "./three/orb";
import { introAnimation } from "./gsap/intro";
import { heroScroll } from "./gsap/heroScroll";
import { servicesAnimation } from "./gsap/showcase";
import { startAnimation } from "./three/animation";
import { resize } from "./three/resize";
import { mouse } from "./three/mouse";
import { statementAnimation } from "./gsap/statement";
import { counterAnimation } from "./gsap/counter";

gsap.registerPlugin(ScrollTrigger);

// ---------------- HTML ----------------

document.querySelector("#app").innerHTML = `
<section class="hero">

    <canvas id="webgl"></canvas>

    <div class="hero-content">

        <h1 class="title">
            WE BUILD DIGITAL <br>EXPERIENCES
        </h1>

        <p class="desc">
            Three.js + GSAP Learning
        </p>

        <button class="btn">
            Explore
        </button>

    </div>

</section>

<section class="statement">

    <div class="container">

        <h2 class="statement-text">
            We craft bespoke digital journeys, fueled by precision,
            innovation, and authentic partnerships.
            Together, we'll navigate the future.
        </h2>

    </div>

</section>

<section class="counter-section">

    <div class="counter-item">
        <h2 class="counter" data-target="150">0</h2>
        <p>Projects Completed</p>
    </div>

    <div class="counter-item">
        <h2 class="counter" data-target="45">0</h2>
        <p>Happy Clients</p>
    </div>

    <div class="counter-item">
        <h2 class="counter" data-target="6">0</h2>
        <p>Years Experience</p>
    </div>

    <div class="counter-item">
        <h2 class="counter" data-target="12">0</h2>
        <p>Awards Won</p>
    </div>

</section>

`;

const renderer = createRenderer();

addLights(scene);

loadEnvironment(scene);

const {
    orb,
    orbGroup,
    mixer,
    baseRotation,
    getIsScrolling,
    setIsScrolling
} = await loadOrb(scene);

introAnimation();

heroScroll(
    camera,
    orb,
    orbGroup,
    baseRotation,
    setIsScrolling
);

startAnimation(
    renderer,
    scene,
    camera,
    mixer,
    orb,
    orbGroup,
    mouse,
    baseRotation,
    getIsScrolling
);

servicesAnimation();
statementAnimation();
counterAnimation();

resize(camera, renderer);
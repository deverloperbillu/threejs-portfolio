import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function heroScroll(
    camera,
    orb,
    orbGroup,
    baseRotation,
    setScrolling
) {

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

            onEnter: () => setScrolling(true),
            onLeave: () => setScrolling(false),
            onEnterBack: () => setScrolling(true),
            onLeaveBack: () => setScrolling(false)

        }

    })

    .to(camera.position, {
        z: 2.3,
        duration: 1
    }, 0)

    .to(orb.rotation, {
        y: baseRotation.y + Math.PI * 2,
        x: baseRotation.x + 0.8,
        duration: 1
    }, 0)

    .to(orbGroup.position, {
        x: 1.5,
        y: 0,
        duration: 1
    }, 0)

    .to(".hero-content", {
        opacity: 0,
        y: -120,
        duration: 0.8
    }, 0);

}
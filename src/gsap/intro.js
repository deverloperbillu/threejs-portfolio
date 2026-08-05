import gsap from "gsap";

export function introAnimation() {

    const tl = gsap.timeline();

    tl

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

}
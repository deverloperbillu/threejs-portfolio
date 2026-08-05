import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function statementAnimation() {

    const split = new SplitType(".statement-text", {
        types: "words"
    });

    gsap.fromTo(
        split.words,
        {
            opacity: 0.15,
            filter: "blur(8px)",
            y: 20,
            color: "#fff"
        },
        {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            color: "#000",
            stagger: 0.08,
            ease: "none",

            scrollTrigger: {
                trigger: ".statement",
                start: "top 70%",
                end: "bottom center",
                scrub: true
            }
        }
    );

}
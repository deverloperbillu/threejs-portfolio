import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function servicesAnimation(){

   gsap.to(".statement-title",{

        xPercent:-45,

        ease:"none",

        scrollTrigger:{

            trigger:".statement",

            start:"top bottom",

            end:"bottom top",

            scrub:1.5

        }

    });

}
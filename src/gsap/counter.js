import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function counterAnimation(){

    document.querySelectorAll(".counter").forEach(counter=>{

        const target = +counter.dataset.target;

        gsap.fromTo(counter,
        {
            innerText:0
        },
        {
            innerText:target,
            duration:2,
            ease:"power2.out",
            snap:{innerText:1},

            scrollTrigger:{
                trigger:counter,
                start:"top 85%",
                once:true
            },

            onUpdate:function(){
                counter.innerText=Math.floor(counter.innerText)+"+";
            }

        });

    });

}
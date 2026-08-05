export const mouse = {

    x:0,

    y:0

};

window.addEventListener("mousemove",(e)=>{

    mouse.x = (e.clientX/window.innerWidth)*2-1;

    mouse.y = -(e.clientY/window.innerHeight)*2+1;

});
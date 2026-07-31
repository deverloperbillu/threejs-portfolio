varying vec2 vUv;

void main(){

    vec3 color = mix(

        vec3(0.20,0.10,0.90),

        vec3(0.00,0.90,1.00),

        vUv.y

    );

    gl_FragColor = vec4(color,1.0);

}
uniform float uTime;

varying vec2 vUv;

void main(){

    vUv = uv;

    vec3 pos = position;

    float wave = sin(pos.y * 4.0 + uTime * 2.0) * 0.12;

    pos += normal * wave;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos,1.0);

}
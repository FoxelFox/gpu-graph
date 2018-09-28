#version 300 es
precision highp float;

in vec3 position;
in vec2 use;
out vec4 outColor;




void main() {


    float r = position.x * 0.5 + 1.0;
    float g = position.y * 0.5 + 1.0;
    float b = position.z * 0.5 + 1.0;


    outColor = vec4(use.x * r, use.x * g, use.x * b, use.x);
}
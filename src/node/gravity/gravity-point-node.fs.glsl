#version 300 es
precision highp float;

in vec3 position;
in vec2 use;
out vec4 outColor;




void main() {


    float r = position.x * 0.5 + 0.5;
    float g = position.y * 0.5 + 0.5;
    float b = position.z * 0.5 + 0.5;


    outColor = vec4(use.x, use.x, use.x, use.x);
}
#version 300 es
precision highp float;

in vec2 velocity;
out vec4 outColor;




void main() {

    float x = abs(velocity.x) * 500.0;
    float y = abs(velocity.y) * 500.0;
    float v = length(velocity) * 200.0;


    float r = clamp(v, 0.01, 1.0);
    float b = clamp(1.0/ (v* 50.0), 0.5, 1.0);
    float g = clamp(1.0 - (r+b), 0.02, 1.0);


    outColor = vec4(r, 0.1, b, 0.1);
}
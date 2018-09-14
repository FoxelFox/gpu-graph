#version 300 es

uniform sampler2D image;
uniform float ar;

in vec2 index;
out vec2 velocity;

void main() {

    vec4 texel = texelFetch(image, ivec2(index), 0);

    velocity = texel.zw;

    texel.r *= ar;
    texel.b = 0.0;
    texel.a = 1.0;
    gl_Position =  texel;
    gl_PointSize = 2.0;
}
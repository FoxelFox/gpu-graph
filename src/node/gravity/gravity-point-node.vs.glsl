#version 300 es

uniform sampler2D image;

in vec2 index;

void main() {

    vec4 texel = texelFetch(image, ivec2(index), 0);
    texel.b = 0.0;
    texel.a = 1.0;
    gl_Position =  texel;
    gl_PointSize = 0.5;
}
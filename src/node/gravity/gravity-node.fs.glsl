#version 300 es
precision mediump float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

void main() {

    vec4 o = texture(image, v_texCoord);
    o.x += 0.01;
    outColor = o;
}
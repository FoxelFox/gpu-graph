#version 300 es
precision mediump float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

void main() {
    outColor = vec4(v_texCoord.x, v_texCoord.y, 0.0, 1.0);
}
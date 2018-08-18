#version 300 es
precision mediump float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

void main() {
    outColor = vec4(v_texCoord.x * 2.0 - 1.0, v_texCoord.y * 2.0 - 1.0, 0.0, 0.0);
}
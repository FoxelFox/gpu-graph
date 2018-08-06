#version 300 es
precision mediump float;

uniform sampler2D image;
in vec2 texCoord;
out vec4 outColor;

void main() {
//   outColor = webGLTexture(image, texCoord);
outColor = vec4(1, 0, 0.5, 1);
}
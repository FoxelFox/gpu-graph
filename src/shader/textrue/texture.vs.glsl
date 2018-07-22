#version 300 es

in vec4 position;
in vec2 texCoord;

out vec2 texCoord;

void main() {
  gl_Position = position;
  texCoord = texCoord;
}
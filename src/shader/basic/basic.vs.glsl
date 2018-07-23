#version 300 es

in vec4 position;

void main() {
  gl_Position = position;
  gl_PointSize = 1.0;
}
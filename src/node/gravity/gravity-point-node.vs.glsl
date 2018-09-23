#version 300 es

uniform sampler2D image;
uniform float ar;
uniform mat4 view;
uniform mat4 rotation;
uniform mat4 translation;

in vec2 index;
out vec3 position;

void main() {

    vec4 texel = texelFetch(image, ivec2(index), 0);

    position = texel.xyz;

    //position.z -= 10.0;

    gl_Position = vec4(position, 1.0) * rotation * translation * view;
    gl_PointSize = 2.0;
}
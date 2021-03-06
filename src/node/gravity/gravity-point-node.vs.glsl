#version 300 es

uniform sampler2D image;
uniform float ar;
uniform mat4 view;
uniform mat4 rotation;
uniform mat4 translation;

in vec2 index;
out vec3 position;
out vec2 use;

void main() {

    vec4 texel = texelFetch(image, ivec2(index), 0);

    position = texel.xyz;

    //position.z -= 10.0;

    gl_Position = vec4(position, 1.0) * rotation * translation * view;
    use = vec2(texel.w, 0.0);
    gl_PointSize = clamp(4.0 / (gl_Position.z * 0.25), 1.0, 64.0);
}
#version 300 es
precision mediump float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

void main() {

    vec4 o = texture(image, v_texCoord);
    vec2 position = vec2(o.x, o.y);
    vec2 velocity = vec2(o.z, o.w);

    float radius = length(position);
    float force = clamp(1.0 / (radius * radius), -1.0, 1.0);

    velocity -= normalize(position) * force * 0.00001;

    position += velocity;

    outColor = vec4(position, velocity);
}
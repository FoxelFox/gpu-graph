#version 300 es
precision highp float;

uniform sampler2D image;
uniform vec2 mouse;
uniform float forceActive;

in vec2 v_texCoord;
out vec4 outColor;

void main() {

    vec4 o = texture(image, v_texCoord);
    vec2 position = vec2(o.x, o.y);
    vec2 velocity = vec2(o.z, o.w);

    float radius = distance(mouse, position);
    float force = clamp(1.0 / (radius * radius), -800.0, 800.0);

    velocity -= normalize(position - mouse) * force * 0.000001 * forceActive;




    position += velocity;

    if (length(position) > 0.8 ) {
        velocity *= (1.0 - length(position) * 0.01);
    }


    outColor = vec4(position, velocity);
}
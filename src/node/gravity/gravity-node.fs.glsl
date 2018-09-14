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
    float force = clamp(1.0 / (radius * radius), 0.0, 0.001);

    // velocity -= normalize(position - mouse) * force * 0.01 * forceActive;

    if (forceActive < 0.1) {
        for (int x = 0; x < 128; x++) {
            for (int y = 0; y < 128; y++) {

                vec2 p = texelFetch(image, ivec2(x, y), 0).xy;


                if (!(p.x == position.x && p.y == position.y)) {
                    float radius = distance(p, position);


                    float force = clamp(1.0 / (radius * radius), 0.0, 100.0);



                    if (radius > (mouse.x * 0.5 + 0.5)) {
                        velocity -= normalize(position - p) * force * 0.000000025;
                    } else {
                        velocity += normalize(position - p) * force * 0.000000025;
                    }

                }
            }
        }
    }
    velocity *= 0.99;







    position += velocity;




    outColor = vec4(position, velocity);
}
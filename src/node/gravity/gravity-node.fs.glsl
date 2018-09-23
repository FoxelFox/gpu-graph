#version 300 es
precision highp float;

uniform sampler2D image;
uniform vec2 mouse;
uniform float forceActive;

in vec2 v_texCoord;
out vec4 outColor;

void main() {

    vec4 o = texture(image, v_texCoord);
    vec3 position = vec3(o.x, o.y, o.z);
    vec3 velocity = vec3(0.0, 0.0, 0.0);


//    float radius = distance(vec3(0.0,0.0, 0.0), position);
//    float force = 1.0 / (radius * radius);
//    velocity -= normalize(position - vec3(0.0, 0.0, 0.0)) * force * 0.00005;


    if (forceActive < 0.1) {
        for (int x = 0; x < 128; x++) {
            for (int y = 0; y < 128; y++) {

                vec3 p = texelFetch(image, ivec2(x, y), 0).xyz;

                if (!(p.x == position.x && p.y == position.y)) {
                    float radius = distance(p, position);
                    float force = 1.0 / (radius * radius);

                    if (radius > 1.0) {
                        velocity -= normalize(position - p) * force * 0.000005;
                    } else {
                        velocity += normalize(position - p) * force * 0.000005;
                    }

                }
            }
        }
        position *= 0.9;
    }

    position += velocity;

    outColor = vec4(position, 0.0);
}
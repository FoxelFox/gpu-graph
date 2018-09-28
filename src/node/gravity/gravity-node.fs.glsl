#version 300 es
precision highp float;
precision mediump sampler3D;

uniform sampler2D image;
uniform sampler3D edges;
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
        for (int x = 0; x < 7; x++) {

            vec3 ref = texelFetch(edges, ivec3(v_texCoord.x,v_texCoord.y, x), 0).xyz;

            if (ref.x >= 0.0) {
                vec3 p = texelFetch(image, ivec2(ref.x, ref.y), 0).xyz;

                if (!(p.x == position.x && p.y == position.y)) {
                    float radius = distance(p, position);
                    float force = ref.z;

                    if (radius > 1.0 - ref.z) {
                        velocity -= normalize(position - p) * ref.z * 0.05;
                    } else {
                        velocity += normalize(position - p) * 0.025;
                    }

                }
            }



        }

//         for (int x = 0; x < 64; x++) {
//                for (int y = 0; y < 64; y++) {
//
//                    vec3 p = texelFetch(image, ivec2(x, y), 0).xyz;
//
//                    if (!(p.x == position.x && p.y == position.y)) {
//                        float radius = distance(p, position);
//
//
//                        if (radius > 1.0) {
//
//                        } else {
//                            float force = 1.0 / (radius * radius);
//                            velocity += normalize(position - p) * force * 0.000005;
//                        }
//
//                    }
//                }
//            }
             position *= 0.99;

    }

    position += velocity;

    outColor = vec4(position, 0.0);
}
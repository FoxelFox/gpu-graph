#version 300 es
precision highp float;
precision mediump sampler3D;

uniform sampler2D image;
uniform sampler3D edges;
uniform vec2 mouse;
uniform float forceActive;
uniform float size;
uniform float nodes;

in vec2 v_texCoord;
out vec4 outColor;

void main() {

    vec4 o = texture(image, v_texCoord);
    vec3 position = vec3(o.x, o.y, o.z);
    vec3 velocity = vec3(0.0, 0.0, 0.0);


//    float radius = distance(vec3(0.0,0.0, 0.0), position);
//    float force = 1.0 / (radius * radius);
//    velocity -= normalize(position - vec3(0.0, 0.0, 0.0)) * force * 0.00005;


    if (o.w > 0.5) {
        if (forceActive < 0.1) {
            for (int x = 0; x < 7; x++) {

                vec3 ref = texelFetch(edges, ivec3(x, v_texCoord.x * size,v_texCoord.y * size), 0).xyz;

                if (ref.x >= 0.0) {
                    vec3 p = texelFetch(image, ivec2(ref.x, ref.y), 0).xyz;

                    if (!(p.x == position.x && p.y == position.y)) {
                        float radius = distance(p, position);
                        float force = ref.z;

                        if (radius > 0.2) {
                            force *= 2.0;
                        }

                        //if (radius > 0.2) {
                            velocity -= normalize(position - p) * force * 0.01;
                        //} else {
                            //velocity += normalize(position - p) * force * 0.005;
                        //}

                    }
                }

            }

                 for (float x = 0.0; x < size; x++) {
                    for (float y = 0.0; y < size; y++) {

                        vec4 pp = texelFetch(image, ivec2(x, y), 0);


                        if(pp.w > 0.55) {
                            vec3 p = pp.xyz;
                            if (!(p.x == position.x && p.y == position.y)) {
                                float radius = distance(p, position);
                                float force = 1.0 / (radius * radius);

                                //if (radius > 1.0) {
                                    // velocity -= normalize(position - p) * force * 0.0000005;
                                //} else {

                                    velocity += normalize(position - p) * 0.00001 * clamp(force, 0.0, 1024.0);
                                //}

                            }
                        }


                    }
                }
                 position *= 0.999;
            }
    }




    position += velocity;

    outColor = vec4(position, o.w);
}
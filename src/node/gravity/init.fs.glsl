#version 300 es
precision highp float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

float PHI = 1.61803398874989484820459 * 00000.1; // Golden Ratio
float PI  = 3.14159265358979323846264 * 00000.1; // PI
float SQ2 = 1.41421356237309504880169 * 10000.0; // Square Root of Two

float gold_noise(vec2 coordinate, float seed){
    return fract(tan(distance(coordinate*(seed+PHI), vec2(PHI, PI)))*SQ2);
}

void main() {
    float rx = gold_noise(v_texCoord.xy, v_texCoord.y);
    float ry = gold_noise(v_texCoord.xy, v_texCoord.x);



    vec2 n = normalize(vec2((v_texCoord.x -0.5) - (rx -0.5), (v_texCoord.y -0.5) - (ry -0.5)));

    // n += vec2(ry - 0.5, rx -0.5);

    outColor = vec4(
        v_texCoord.x * 2.0 - 1.0,
        v_texCoord.y * 2.0 - 1.0,
        (rx - 0.5) * 0.001,
        (ry - 0.5) * 0.001
    );
}


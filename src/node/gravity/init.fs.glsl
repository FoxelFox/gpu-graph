#version 300 es
precision highp float;

uniform sampler2D image;
uniform float size;
uniform float nodes;

in vec2 v_texCoord;
out vec4 outColor;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {

    float use;

    if ((gl_FragCoord.y * size + gl_FragCoord.x) < nodes) {
        use = 1.0;
    } else {
        use = 0.0;
    }

    outColor = vec4(
        (random(v_texCoord.xy) * 2.0 - 1.0) * 1.0,
        (random(v_texCoord.yx) * 2.0 - 1.0) * 1.0,
        (random(v_texCoord.yx + v_texCoord.xy) * 2.0 - 1.0) * 1.0,
        use
    );
}


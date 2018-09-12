#version 300 es
precision highp float;

uniform sampler2D image;
in vec2 v_texCoord;
out vec4 outColor;

float rand( vec2 pos ) {
	return fract( sin( dot( pos, vec2( 12.235, 67.532 ) ) ) * 43289.24 );
}

vec2 rand2( vec2 pos ) {
	return fract( sin(
		vec2( dot( pos, vec2( 12.235, 67.532 ) ) , dot( pos, vec2( 142.32, 93.91 ) ) )
	) * 43289.24 );
}

float noise( vec2 pos ) {
	vec2 ip = floor( pos );
	vec2 fp = smoothstep(0.,1., fract(pos));
	vec2 a  = vec2(
		rand( ip + vec2( 0.0, 0.0 ) ),
		rand( ip + vec2( 1.0, 0.0 ) )
	);
	vec2 b  = vec2(
		rand( ip + vec2( 0.0, 1.0 ) ),
		rand( ip + vec2( 1.0, 1.0 ) )
	);
	a = mix( a, b, fp.y );
	return mix( a.x, a.y, fp.x );
}

float perlin( vec2 pos ) {
	return  ( noise( pos ) * 32. +
		noise( pos * 2. ) * 16. +
		noise( pos * 4. ) * 8. +
		noise( pos * 8. ) * 4. +
		noise( pos * 16.) * 2. +
		noise( pos * 32.)) / 63.;
}

void main() {
    float rx = perlin(v_texCoord.xy * 16.0);
    float ry = perlin(v_texCoord.xy * 16.0);





    vec2 n = normalize(vec2((v_texCoord.x -0.5) - (rx -0.5), (v_texCoord.y -0.5) - (ry -0.5)));

    // n += vec2(ry - 0.5, rx -0.5);

    vec2 p = vec2((v_texCoord.x * 2.0 - 1.0) * rx, (v_texCoord.y * 2.0 - 1.0) * ry);

    outColor = vec4(
        (v_texCoord.x * 2.0 - 1.0),
        (v_texCoord.y * 2.0 - 1.0),
        p.x * 0.1,
        p.y * 0.1
    );
}


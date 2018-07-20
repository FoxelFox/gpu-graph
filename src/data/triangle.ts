import {gl} from "../context";

export class Triangle {
    positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];

    buffer: WebGLBuffer;

    constructor() {
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
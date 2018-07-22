import {gl} from "../context";
import {VertexPointer} from "./interfaces";

export class Quad {
    rawPositions = [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
    ];

    rawUV = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];

    position: WebGLBuffer;
    uv: WebGLBuffer;

    vertexPointer: VertexPointer = {
        size: 2,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0
    };

    uvPointer: VertexPointer = {
        size: 2,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0
    };

    constructor() {

        // position
        this.position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rawPositions), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // uv
        this.uv = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uv);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rawUV), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

}
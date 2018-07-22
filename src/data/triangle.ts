import {gl} from "../context";
import {VertexPointer} from "./interfaces";

export class Triangle {
    rawPositions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];

    position: WebGLBuffer;

    vertexPointer: VertexPointer = {
        size: 2,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0
    };

    constructor() {
        this.position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rawPositions), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

}
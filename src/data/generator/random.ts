import {gl} from "../../context";
import {VertexPointer} from "../interfaces";

export class Random {

    rawPositions = [];
    position: WebGLBuffer;

    vertexPointer: VertexPointer = {
        size: 2,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0
    };

    constructor () {

        for (let i = 0; i < 16 * 16; ++i) {
            this.rawPositions.push(Math.random() * 2 -1 );
        }

        this.position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.position);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rawPositions), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
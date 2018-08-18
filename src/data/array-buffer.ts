import {gl} from "../context";

export class ArrayBuffer {

    rawData;
    buffer: WebGLBuffer;
    size: number;
    type: number;
    normalize: boolean;
    stride: number;
    offset: number;

    constructor(data: number[], size: number, type: number, normalize?: boolean, stride?: number, offset?: number) {


        this.size = size;
        this.type = type;
        this.normalize = !!normalize;
        this.stride = stride ? stride : 0;
        this.offset = offset ? offset : 0;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.createArray(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    createArray(data) {
        switch (this.type) {
            case gl.FLOAT: return new Float32Array(data);
            case gl.INT: return new Int32Array(data);
        }
    }
}
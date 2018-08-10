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
        switch (type) {
            case gl.FLOAT: this.rawData = new Float32Array(data);
        }

        this.size = size;
        this.type = type;
        this.normalize = !!normalize;
        this.stride = stride ? stride : 0;
        this.offset = offset ? offset : 0;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rawData), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
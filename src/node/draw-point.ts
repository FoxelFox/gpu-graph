import {Basic} from "../shader/basic/basic";
import {gl} from "../context";
import {Quad} from "../data/quad";
import {Random} from "../data/generator/random";
import {FrameBuffer} from "../data/frame-buffer";
import {Texture} from "../data/texture";
import {Node} from "./node";

export class DrawPoint implements Node{

    data: Random;
    shader: Basic;

    vao: WebGLVertexArrayObject;
    frameBuffer: FrameBuffer;

    constructor() {
        this.data = new Random();
        this.shader = new Basic();
        this.vao = gl.createVertexArray();

        this.frameBuffer = new FrameBuffer([new Texture(128, 128)]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.data.position);
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(this.shader.position);
        gl.vertexAttribPointer(
            this.shader.position,
            this.data.vertexPointer.size,
            this.data.vertexPointer.type,
            this.data.vertexPointer.normalize,
            this.data.vertexPointer.stride,
            this.data.vertexPointer.offset
        );

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    run() {
        // this.frameBuffer.bind();
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, this.data.rawPositions.length / 2);


    }

}
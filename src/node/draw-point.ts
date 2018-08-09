import {gl} from "../context";
import {Quad} from "../data/quad";
import {Random} from "../data/generator/random";
import {FrameBuffer} from "../data/frame-buffer";
import {Texture} from "../data/texture";
import {Node} from "./node";
import {Shader, sr} from "../shader/shader";

export class DrawPoint implements Node {

    data: Random;
    shader: Shader;

    vao: WebGLVertexArrayObject;
    frameBuffer: FrameBuffer;

    output: Texture;

    constructor() {
        this.data = new Random();
        this.shader = new Shader(require("../shader/basic/basic.vs.glsl"), require("../shader/basic/basic.fs.glsl"));
        this.vao = gl.createVertexArray();

        this.output = new Texture(16, 16);
        this.frameBuffer = new FrameBuffer([this.output]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.data.position);
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation("position"));
        gl.vertexAttribPointer(
            this.shader.getAttributeLocation("position"),
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
        this.frameBuffer.bind();
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, this.data.rawPositions.length / 2);


    }

}
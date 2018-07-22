import {Basic} from "../shader/basic/basic";
import {gl} from "../context";
import {Quad} from "../data/quad";

export class DrawQuad {

    data: Quad;
    shader: Basic;

    vao: WebGLVertexArrayObject;

    constructor() {
        this.data = new Quad();
        this.shader = new Basic();
        this.vao = gl.createVertexArray();

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
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}
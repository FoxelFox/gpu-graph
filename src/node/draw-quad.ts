import {gl} from "../context";
import {Quad} from "../data/quad";
import {Shader, sr} from "../shader/shader";

export class DrawQuad {

    quad: Quad;
    shader: Shader;
    vao: WebGLVertexArrayObject;

    constructor() {
        this.shader = sr.basic;
    }

    initVertex() {
        this.quad = new Quad();
        this.vao = gl.createVertexArray();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.position.buffer);
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation("position"));
        gl.vertexAttribPointer(
            this.shader.getAttributeLocation("position"),
            this.quad.position.size,
            this.quad.position.type,
            this.quad.position.normalize,
            this.quad.position.stride,
            this.quad.position.offset
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
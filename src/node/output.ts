import {Node} from "./node"
import {FrameBuffer} from "../data/frame-buffer";
import {Shader, sr} from "../shader/shader";
import {Quad} from "../data/quad";
import {gl} from "../context";
import {Texture} from "../data/texture";

export class OutputNode implements Node {

    texture: Texture;

    frameBuffer: FrameBuffer;
    quad: Quad;
    shader: Shader;
    vao: WebGLVertexArrayObject;

    constructor() {
        this.shader = new Shader(require("./output.vs.glsl"), require("./output.fs.glsl"));
    }

    init() {
        this.quad = new Quad();
        this.vao = gl.createVertexArray();

        gl.bindVertexArray(this.vao);



        // position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.position);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation("position"));
        gl.vertexAttribPointer(
            this.shader.getAttributeLocation("position"),
            this.quad.vertexPointer.size,
            this.quad.vertexPointer.type,
            this.quad.vertexPointer.normalize,
            this.quad.vertexPointer.stride,
            this.quad.vertexPointer.offset
        );

        // uv
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.uv);
        gl.enableVertexAttribArray(this.shader.getAttributeLocation("a_texCoord"));
        gl.vertexAttribPointer(
            this.shader.getAttributeLocation("a_texCoord"),
            this.quad.uvPointer.size,
            this.quad.uvPointer.type,
            this.quad.uvPointer.normalize,
            this.quad.uvPointer.stride,
            this.quad.uvPointer.offset
        );

        // texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);

        // needed?
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);


        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    run() {
        gl.viewport(0, 0, 1024, 1024);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    setTexture(texture: Texture) {
        this.texture = texture;
    }

}
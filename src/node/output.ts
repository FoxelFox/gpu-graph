import {Node} from "./node"
import {FrameBuffer} from "../data/frame-buffer";
import {Shader, sr} from "../shader/shader";
import {Quad} from "../data/quad";
import {gl} from "../context";
import {Texture} from "../data/texture";
import {Random} from "../data/generator/random";

export class OutputNode extends Node {

    texture: Texture;

    constructor() {
        super(new Shader(require("./output.vs.glsl"), require("./output.fs.glsl")), new Quad() as {});
    }

    init() {

        // texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    run() {
        gl.viewport(0, 0, 1024, 1024);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        gl.useProgram(this.shader.program);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);


        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);


    }

    setTexture(texture: Texture) {
        this.texture = texture;
    }

}
import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Quad} from "../../data/quad";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {gl} from "../../context";

export class GravityNode extends Node {

    texture: Texture;

    constructor (public size: number) {
        super(new Shader(require("./gravity-node.vs.glsl"), require("./gravity-node.fs.glsl")),  new Quad() as {})
    }

    init() {
        this.frameBuffer = new FrameBuffer([this.texture], true);

        // texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);

        // needed?
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    run() {
        gl.viewport(0, 0, this.size, this.size);
        this.frameBuffer.bind();
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        this.frameBuffer.flip();
    }
}
import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Quad} from "../../data/quad";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {gl} from "../../context";
import {user} from "../../input/user";

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

    }

    run() {
        this.frameBuffer.bind();
        gl.viewport(0, 0, this.size, this.size);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);
        gl.useProgram(this.shader.program);

        gl.uniform2f (this.shader.getUniformLocation("mouse"),  user.mpX, user.mpY);
        gl.uniform1f(this.shader.getUniformLocation("forceActive"), user.force);

        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        this.frameBuffer.flip();
    }
}
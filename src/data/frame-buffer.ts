import {gl} from "../context";
import Global = NodeJS.Global;
import {Texture} from "./texture";

export class FrameBuffer {

    fb: WebGLFramebuffer;

    constructor(private textures: Texture[]) {


        this.fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);

        let i = 0;
        for (let texture of this.textures) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, texture.webGLTexture, 0);
            i++;
        }

        this.unbind();

    }

    bind () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        gl.viewport(0, 0, this.textures[0].x, this.textures[0].y);
    }

    unbind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
}
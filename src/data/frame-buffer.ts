import {gl} from "../context";
import {Texture} from "./texture";

export class FrameBuffer {

    fb: WebGLFramebuffer;

    // for double buffering
    private fb2: WebGLFramebuffer;


    constructor(public textures: Texture[], private doubleBuffered?: boolean) {


        if (doubleBuffered) {
            for (let t of this.textures) {
                t.makeDoubleBuffered();
            }

            this.fb2 = this.createFrameBuffer();
        }
        this.fb = this.createFrameBuffer(doubleBuffered);
    }

    createFrameBuffer(doubleBuffered?: boolean) {
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        let i = 0;
        for (let texture of this.textures) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, doubleBuffered ? texture.webGLTexture2 : texture.webGLTexture, 0);
            i++;
        }


        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.error("FrameBuffer does not work with this setup!");
        }

        this.unbind();
        return fb;
    }

    bind () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        gl.viewport(0, 0, this.textures[0].x, this.textures[0].y);
    }

    unbind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    flip() {
        const fb = this.fb;
        this.fb = this.fb2;
        this.fb2 = fb;

        for (let texture of this.textures) {
            texture.flip();
        }
    }

}
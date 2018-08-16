import {gl} from "../context";
import {Texture} from "./texture";

export class FrameBuffer {

    fb: WebGLFramebuffer;

    // for double buffering
    private fb2: WebGLFramebuffer;
    private textures2: Texture[];

    constructor(public textures: Texture[], private doubleBuffered?: boolean) {

        this.fb = this.createFrameBuffer(this.textures);
        if (doubleBuffered) {

            this.textures2 = [];
            for (let t of this.textures) {
                this.textures2.push(t.copy());
            }

            this.fb2 = this.createFrameBuffer(this.textures2);
            this.flip();
        }
    }

    createFrameBuffer(textures: Texture[]) {
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        let i = 0;
        for (let texture of textures) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, texture.webGLTexture, 0);
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
        const t = this.textures;
        const fb = this.fb;

        this.textures = this.textures2;
        this.fb = this.fb2;

        this.textures2 = t;
        this.fb2 = fb;
    }

    get outputTextures(): Texture[] {
        if (this.doubleBuffered) {
            return this.textures2;
        } else {
            return this.textures;
        }
    }
}
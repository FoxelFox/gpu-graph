import {gl} from "../context";

export class Texture {

    webGLTexture: WebGLTexture;

    constructor(public  x, public y) {
        this.webGLTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.webGLTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.x, this.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }


}
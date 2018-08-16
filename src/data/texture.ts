import {gl} from "../context";

export class Texture {

    webGLTexture: WebGLTexture;

    constructor(public  x, public y, private data?, private iFormat?: number, private format?: number, private type?: number) {
        this.webGLTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.webGLTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, iFormat || gl.RGBA, this.x, this.y, 0, format || gl.RGBA, type || gl.UNSIGNED_BYTE, data ? data : null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    copy(): Texture {
        return new Texture(this.x, this.y, this.data, this.iFormat, this.format, this.type);
    }


}
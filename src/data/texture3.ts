import {gl} from "../context";

export class Texture3 {

	webGLTexture: WebGLTexture;

	constructor(public  x, public y, public z, private data?, private iFormat?: number, private format?: number, private type?: number) {
		this.webGLTexture = this.create();
	}

	private create() {
		const id = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_3D, id);
		gl.texImage3D(gl.TEXTURE_3D, 0, this.iFormat || gl.RGBA, this.x, this.y, this.z, 0, this.format || gl.RGBA, this.type || gl.UNSIGNED_BYTE, this.data ? this.data : null, 0);


		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);


		gl.bindTexture(gl.TEXTURE_3D, null);

		return id;
	}


}
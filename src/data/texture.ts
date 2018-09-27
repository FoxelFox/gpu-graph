import {canvas, gl} from "../context";

export class Texture {

	webGLTexture: WebGLTexture;
	webGLTexture2: WebGLTexture;

	fitSizeToCanvas: boolean;

	constructor(public  x?, public y?, private data?, private iFormat?: number, private format?: number, private type?: number) {
		this.fitSizeToCanvas = !x && !y;
		if (this.fitSizeToCanvas) {
			this.x = canvas.width;
			this.y = canvas.height;


			window.addEventListener("resize", () => {
				setTimeout(() => {
					this.resizeToCanvas(this.webGLTexture);
					if (this.webGLTexture2) {
						this.resizeToCanvas(this.webGLTexture2);
					}
				});
			});
		}
		this.webGLTexture = this.create();

	}

	makeDoubleBuffered() {
		this.webGLTexture2 = this.create();
	}

	flip() {
		const t = this.webGLTexture;
		this.webGLTexture = this.webGLTexture2;
		this.webGLTexture2 = t;
	}

	private resizeToCanvas(id) {
		this.x = canvas.width;
		this.y = canvas.height;

		gl.bindTexture(gl.TEXTURE_2D, id);
		gl.texImage2D(gl.TEXTURE_2D, 0, this.iFormat || gl.RGBA, this.x, this.y, 0, this.format || gl.RGBA, this.type || gl.UNSIGNED_BYTE, this.data ? this.data : null);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	private create() {
		const id = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, id);
		gl.texImage2D(gl.TEXTURE_2D, 0, this.iFormat || gl.RGBA, this.x, this.y, 0, this.format || gl.RGBA, this.type || gl.UNSIGNED_BYTE, this.data ? this.data : null);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);


		gl.bindTexture(gl.TEXTURE_2D, null);

		return id;
	}


}
import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Quad} from "../../data/quad";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {gl} from "../../context";
import {user} from "../../input/user";
import {Texture3} from "../../data/texture3";
import {settings} from "../../input/settings";

export class GravityNode extends Node {

	texture: Texture;
	edges: Texture3;

	constructor(public size: number) {
		super(new Shader(require("./gravity-node.vs.glsl"), require("./gravity-node.fs.glsl")), new Quad() as {})
	}

	init() {
		this.frameBuffer = new FrameBuffer([this.texture], true);

		// texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);

		settings.data.length = 64 * 64 * 8 * 4;

		this.edges = new Texture3( 8, 64, 64 , new Float32Array(settings.data),  gl.RGBA32F, gl.RGBA, gl.FLOAT);

	}

	run() {
		this.frameBuffer.bind();
		gl.viewport(0, 0, this.size, this.size);

		gl.useProgram(this.shader.program);

		// position texture
		gl.uniform1i(this.shader.getUniformLocation("image"), 0);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture.webGLTexture);

		// edges texture
		gl.uniform1i(this.shader.getUniformLocation("edges"), 1);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_3D, this.edges.webGLTexture);



		gl.uniform2f(this.shader.getUniformLocation("mouse"), user.mpX, user.mpY);
		gl.uniform1f(this.shader.getUniformLocation("forceActive"), user.force);

		gl.bindVertexArray(this.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		this.frameBuffer.flip();
	}
}
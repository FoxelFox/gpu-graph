import {FrameBuffer} from "../../data/frame-buffer";
import {Texture} from "../../data/texture";
import {Shader} from "../../shader/shader";
import {Node} from "../node";
import {Quad} from "../../data/quad";
import {canvas, gl} from "../../context";
import {settings} from "../../input/settings";

export class GravityInitNode extends Node {

	output: Texture;

	constructor(public size: number) {
		super(new Shader(require("./init.vs.glsl"), require("./init.fs.glsl")), new Quad() as {})
	}

	init() {
		this.output = new Texture(this.size, this.size, null, gl.RGBA32F, gl.RGBA, gl.FLOAT);

		this.frameBuffer = new FrameBuffer([this.output]);
	}

	run() {
		gl.viewport(0, 0, this.size, this.size);
		this.frameBuffer.bind();
		gl.useProgram(this.shader.program);

		gl.uniform1f(this.shader.getUniformLocation("size"), settings.size);
		gl.uniform1f(this.shader.getUniformLocation("nodes"), settings.nodes);

		gl.bindVertexArray(this.vao);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}
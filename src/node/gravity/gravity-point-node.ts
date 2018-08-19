import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Quad} from "../../data/quad";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {canvas, gl} from "../../context";
import {ArrayBuffer} from "../../data/array-buffer";


const p = [];

for (let x = 0; x < 4096; ++x) {
    for (let y = 0; y < 4096; ++y) {
        p.push(x);
        p.push(y);
    }
}

export class GravityPointNode extends Node {

    data: Texture;

    constructor () {
        super(new Shader(require("./gravity-point-node.vs.glsl"), require("./gravity-point-node.fs.glsl")),  { index: new ArrayBuffer(p, 2, gl.INT) })
    }

    init() {
        this.frameBuffer = new FrameBuffer([new Texture()]);
    }

    run() {
        this.frameBuffer.bind();
        gl.viewport(0, 0, canvas.width, canvas.height);


        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        gl.enable( gl.BLEND );
        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.ONE, gl.ONE);

        gl.bindTexture(gl.TEXTURE_2D, this.data.webGLTexture);
        gl.useProgram(this.shader.program);

        gl.uniform1f(this.shader.getUniformLocation("ar"), canvas.height / canvas.width);

        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, p.length / 2);


        gl.disable( gl.BLEND );
        gl.disable(gl.DEPTH_TEST);

    }
}
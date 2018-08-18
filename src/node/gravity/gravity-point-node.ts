import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Quad} from "../../data/quad";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {gl} from "../../context";
import {ArrayBuffer} from "../../data/array-buffer";


const p = [];

for (let x = 0; x < 1024; ++x) {
    for (let y = 0; y < 1024; ++y) {
        p.push(x);
        p.push(y);
    }
}

export class GravityPointNode extends Node {

    data: Texture;

    constructor (public size: number) {
        super(new Shader(require("./gravity-point-node.vs.glsl"), require("./gravity-point-node.fs.glsl")),  { index: new ArrayBuffer(p, 2, gl.INT) })
    }

    init() {
        this.frameBuffer = new FrameBuffer([new Texture(this.size, this.size)]);
    }

    run() {
        this.frameBuffer.bind();
        gl.viewport(0, 0, this.size, this.size);

        gl.clearColor( 1.0, 1.0, 1.0, 0.0 );
        gl.clearDepth( 1.0 );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        gl.bindTexture(gl.TEXTURE_2D, this.data.webGLTexture);
        gl.useProgram(this.shader.program);
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, p.length / 2);
    }
}
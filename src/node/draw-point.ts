import {gl} from "../context";
import {Quad} from "../data/quad";
import {Random} from "../data/generator/random";
import {FrameBuffer} from "../data/frame-buffer";
import {Texture} from "../data/texture";
import {Node} from "./node";
import {Shader, sr} from "../shader/shader";

export class DrawPoint extends Node {

    frameBuffer: FrameBuffer;

    output: Texture;

    constructor() {
        super(new Shader(require("../shader/basic/basic.vs.glsl"), require("../shader/basic/basic.fs.glsl")), new Random() as {} );
        this.output = new Texture(16, 16);
        this.frameBuffer = new FrameBuffer([this.output]);
    }


}
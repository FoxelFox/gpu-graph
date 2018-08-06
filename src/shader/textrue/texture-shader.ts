import {shader} from "../shader";
import {gl} from "../../context";

export class TextureShader {
    program: WebGLProgram = shader.create(require("./texture.vs.glsl"), require("./texture.fs.glsl"));

    position = gl.getAttribLocation(this.program, "position");
    texCoord = gl.getAttribLocation(this.program, "texCoord");
    image = gl.getUniformLocation(this.program, "image");

    constructor() {

    }
}
import {shader} from "../shader";
import {gl} from "../../context";

export class Basic {
    program: WebGLProgram = shader.create(require("./basic.vs.glsl"), require("./basic.fs.glsl"));
    position = gl.getAttribLocation(this.program, "position");
}
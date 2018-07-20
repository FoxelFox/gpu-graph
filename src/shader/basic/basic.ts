import {shader} from "../shader";
import {gl} from "../../context";

export class Basic {
    program: WebGLProgram = shader.create(require("./basic.vs.glsl"), require("./basic.fs.glsl"));
    a_position = gl.getAttribLocation(this.program, "a_position");
}
import {shader} from "./shader/shader";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2") as WebGLRenderingContext;

if (!gl) {
    console.log("No WebGL 2 for you!");
}

shader.create(require("./shader/basic/basic.vs.glsl"), require("./shader/basic/basic.fs.glsl"));
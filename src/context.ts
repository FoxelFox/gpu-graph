import {shader} from "./shader/shader";
import {Triangle} from "./data/triangle";
import {Basic} from "./shader/basic/basic";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

if (!gl) {
    console.log("No WebGL 2 for you!");
}

new Triangle();
new Basic()


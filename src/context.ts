import {shader} from "./shader/shader";
import {Triangle} from "./data/triangle";
import {Basic} from "./shader/basic/basic";
import {DrawTriangle} from "./node/draw-triangle";
import {DrawQuad} from "./node/draw-quad";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

if (!gl) {
    console.log("No WebGL 2 for you!");
}

const batch = new DrawQuad();

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0.1, 0.1, 0.1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

batch.run();

import {Triangle} from "./data/triangle";
import {DrawQuad} from "./node/draw-quad";
import {DrawPoint} from "./node/draw-point";
import {RandomPointsToFrameBuffer} from "./scene/random-points-to-frame-buffer";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2", {antialias: false}) as WebGL2RenderingContext;


if (!gl) {
    console.log("No WebGL 2 for you!");
}

// const batch = new DrawPoint();
// const batch = new DrawTriangle();



gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0.1, 0.1, 0.1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);


new RandomPointsToFrameBuffer().run();

// batch.run();

import {Triangle} from "./data/triangle";
import {DrawQuad} from "./node/draw-quad";
import {DrawPoint} from "./node/draw-point";
import {RandomPointsToFrameBuffer} from "./scene/random-points-to-frame-buffer";
import {Gravity} from "./scene/gravity";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: false,
    premultipliedAlpha: false
}) as WebGL2RenderingContext;


if (!gl) {
    console.log("No WebGL 2 for you!");
}

gl.getExtension("EXT_color_buffer_float");

resize();

// const batch = new DrawPoint();
// const batch = new DrawTriangle();



gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

// new RandomPointsToFrameBuffer().run();

let demo = new Gravity();

requestAnimationFrame(loop);

function loop () {
    resize();
    demo.run();

    requestAnimationFrame(loop);
}

function resize() {
    // Lookup the size the browser is displaying the canvas.
    let displayWidth  = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
}

// batch.run();
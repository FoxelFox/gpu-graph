import {Gravity} from "./scene/gravity";
import {user} from "./input/user";

export const canvas = document.getElementById("c") as HTMLCanvasElement;
export const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: false,
    premultipliedAlpha: false
}) as WebGL2RenderingContext;

export function startCompute() {
    if (!gl) {
        console.log("No WebGL 2 for you!");
    }

    gl.getExtension("EXT_color_buffer_float");

    resize();

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    let demo = new Gravity();

    requestAnimationFrame(loop);

    async function loop () {
        resize();
        await demo.run();
        user.movementX = 0;
        user.movementY = 0;
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
}
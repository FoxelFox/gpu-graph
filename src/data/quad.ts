import {gl} from "../context";
import {ArrayBuffer} from "./array-buffer";

export class Quad {
    position = new ArrayBuffer( [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
    ], 2, gl.FLOAT);

    a_texCoord = new ArrayBuffer([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ], 2, gl.FLOAT);
}
import {gl} from "../../context";
import {VertexPointer} from "../interfaces";
import {ArrayBuffer} from "../array-buffer";

export class Random {


    position: ArrayBuffer;

    constructor () {

        let rawPositions = [];

        for (let i = 0; i < 16 * 16; ++i) {
            rawPositions.push(Math.random() * 2 -1 );
        }

        this.position = new ArrayBuffer(rawPositions, 2, gl.FLOAT);
    }
}
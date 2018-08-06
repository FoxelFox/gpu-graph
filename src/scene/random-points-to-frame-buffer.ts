import {DrawPoint} from "../node/draw-point";
import {Node} from "../node/node";
import {DrawQuad} from "../node/draw-quad";

export class RandomPointsToFrameBuffer {

    nodes: Node[];

    constructor() {

        const drawPoints = new DrawPoint();
        const drawTexture = new DrawQuad();

        this.nodes = [];
    }
}
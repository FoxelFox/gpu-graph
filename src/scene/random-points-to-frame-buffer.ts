import {DrawPoint} from "../node/draw-point";
import {Node} from "../node/node";
import {DrawQuad} from "../node/draw-quad";
import {OutputNode} from "../node/output";

export class RandomPointsToFrameBuffer {

    nodes: Node[];

    constructor() {

        const drawPoints = new DrawPoint();
        const output = new OutputNode();


        output.setTexture(drawPoints.output);
        output.init();

        this.nodes = [drawPoints, output];

    }

    run() {
        for(let node of this.nodes) {
            node.run();
        }
    }
}
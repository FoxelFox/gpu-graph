import {Node} from "../node/node";
import {GravityInitNode} from "../node/gravity/init";
import {GravityNode} from "../node/gravity/gravity-node";
import {OutputNode} from "../node/output";
import {GravityPointNode} from "../node/gravity/gravity-point-node";

export class Gravity {


    gravity: GravityNode;
    points: GravityPointNode;
    output: OutputNode;

    constructor() {
        const init = new GravityInitNode(4096);
        init.init();
        init.run();

        this.gravity = new GravityNode(4096);
        this.gravity.texture = init.output;
        this.gravity.init();

        this.points = new GravityPointNode();
        this.points.data = this.gravity.texture;
        this.points.init();


        this.output = new OutputNode();
        this.output.setTexture(this.points.frameBuffer.textures[0]);
        this.output.init();

    }

    run() {
        this.gravity.run();
        this.points.run();
        this.output.run();
    }
}
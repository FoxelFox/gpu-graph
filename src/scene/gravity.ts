import {Node} from "../node/node";
import {GravityInitNode} from "../node/gravity/init";
import {GravityNode} from "../node/gravity/gravity-node";
import {OutputNode} from "../node/output";

export class Gravity {


    gravity: GravityNode;
    output: OutputNode;

    constructor() {
        const init = new GravityInitNode(16);
        init.init();
        init.run();

        this.gravity = new GravityNode(16);
        this.gravity.texture = init.output;
        this.gravity.init();


        this.output = new OutputNode();
        this.output.setTexture(this.gravity.frameBuffer.textures[0]);
        this.output.init();

    }

    run() {
        this.gravity.run();
        this.output.run();
    }
}
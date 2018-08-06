import {FrameBuffer} from "../data/frame-buffer";

export interface Node {
    frameBuffer: FrameBuffer;
    run();
}
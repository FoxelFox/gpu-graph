import { Node } from "../node/node";
import { GravityInitNode } from "../node/gravity/init";
import { GravityNode } from "../node/gravity/gravity-node";
import { OutputNode } from "../node/output";
import { GravityPointNode } from "../node/gravity/gravity-point-node";
import { settings } from "../input/settings";
import { gl, canvas } from "../context";
import * as JSZip from "jszip";

let i = 0;
let zip = new JSZip();
let img = zip.folder("images");
let recording = false;
const draw = async i => {
  const data = canvas
    .toDataURL("image/png")
    .substr("data:image/png;base64,".length);
  if (i > 0 && i % 512 == 0) {
    await save();
  }
  img.file(`${i}.png`, data, { base64: true });
};

const save = async () => {
  let postfix = Math.floor(i / 512);
  const blob = await zip.generateAsync({ type: "blob" });
  const dataURL = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = dataURL;
  anchor.download = `wiedeo${postfix}.zip`;
  anchor.click();
  zip = new JSZip();
  img = zip.folder("images");
};

window.addEventListener("keydown", event => {
  if (event.key == "r") {
    recording = !recording;
    console.log("recording:", recording);
  } else if (event.key == "s") {
    if (recording) {
        recording = false;
        console.log('recording disabled');
    };
    console.log("saving");
    save();
  }
  document.getElementById('recording').hidden = !recording;
});

export class Gravity {
  gravity: GravityNode;
  points: GravityPointNode;
  output: OutputNode;

  constructor() {
    const init = new GravityInitNode(settings.size);
    init.init();
    init.run();

    this.gravity = new GravityNode(settings.size);
    this.gravity.texture = init.output;
    this.gravity.init();

    this.points = new GravityPointNode();
    this.points.data = this.gravity.texture;
    this.points.init();

    this.output = new OutputNode();
    this.output.setTexture(this.points.frameBuffer.textures[0]);
    this.output.init();
  }

  async run() {
    this.gravity.run();
    this.points.run();
    this.output.run();
    if (recording) await draw(i++);
  }
}

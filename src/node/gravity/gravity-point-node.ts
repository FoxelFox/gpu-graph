import {Node} from "../node"
import {Shader} from "../../shader/shader";
import {Texture} from "../../data/texture";
import {FrameBuffer} from "../../data/frame-buffer";
import {canvas, gl} from "../../context";
import {ArrayBuffer} from "../../data/array-buffer";
import {settings} from "../../input/settings";
import {mat4, quat, vec3} from "gl-matrix";
import {user} from "../../input/user";


export class GravityPointNode extends Node {

    data: Texture;
    view: mat4 = mat4.create();
    rotation: quat = quat.create();
    translation: mat4 = mat4.create();

    constructor () {
        super(new Shader(require("./gravity-point-node.vs.glsl"), require("./gravity-point-node.fs.glsl")),  { index: new ArrayBuffer(settings.indices, 2, gl.INT) })

        quat.identity(this.rotation);
        console.log(this.view);
    }

    init() {
        this.frameBuffer = new FrameBuffer([new Texture()]);
    }

    run() {
        this.frameBuffer.bind();
        gl.viewport(0, 0, canvas.width, canvas.height);


        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        gl.enable( gl.BLEND );
        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_COLOR, gl.ONE);

        gl.bindTexture(gl.TEXTURE_2D, this.data.webGLTexture);
        gl.useProgram(this.shader.program);


        if (user.mousePressed) {
            quat.rotateX(this.rotation, this.rotation, -user.movementY * 0.005);
            quat.rotateY(this.rotation, this.rotation, -user.movementX * 0.005);
        }


        mat4.identity(this.translation);
        mat4.translate(this.translation, this.translation, [0, 0, -(Math.pow(user.wheel * 0.001 + 2.0, 3) * 0.25)]);
        const ar = canvas.width / canvas.height;
        mat4.perspective(this.view, 1.5, ar, 0, 2);
        //mat4.perspectiveFromFieldOfView(this.view, {upDegrees: 45, downDegrees: 45, leftDegrees: 45 * ar, rightDegrees: 45 * ar},0, 2);
        const rot = mat4.create();
        mat4.fromQuat(rot, this.rotation);
        gl.uniformMatrix4fv(this.shader.getUniformLocation("view"), true, this.view);
        gl.uniformMatrix4fv(this.shader.getUniformLocation("rotation"), false, rot);
        gl.uniformMatrix4fv(this.shader.getUniformLocation("translation"), true, this.translation);

        gl.uniform1f(this.shader.getUniformLocation("ar"), canvas.height / canvas.width);


        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.POINTS, 0, settings.indices.length / 2);


        gl.disable( gl.BLEND );
        gl.disable(gl.DEPTH_TEST);

    }
}
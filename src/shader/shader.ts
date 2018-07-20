import {gl} from "../context";

class Shader {
    create(vertexSource: string, fragmentSource: string): WebGLProgram {
        const vs = this.compile(gl.VERTEX_SHADER, vertexSource);
        const fs = this.compile(gl.FRAGMENT_SHADER, fragmentSource);

        if (vs && fs) {
            return this.link(vs, fs);
        } else {
            // cleanup
            if(vs) {
                gl.deleteShader(vs);
            }
            if(fs) {
                gl.deleteShader(fs);
            }
        }
    }

    private link(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
        const program = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if(gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return program
        }

        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    private compile(type: number, source: string): WebGLShader {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        console.error(gl.getShaderInfoLog(shader), source);
        gl.deleteShader(shader);
    }
}

export const shader = new Shader();
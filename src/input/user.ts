import {canvas} from "../context";

class User {
    mpX: number = 0;
    mpY: number = 0;

    constructor() {
        document.addEventListener("mousemove", (e) => {
            this.mpX = ((e.pageX / canvas.width) - 0.5) * 2 * canvas.width / canvas.height;
            this.mpY = ((e.pageY / canvas.height) - 0.5) * 2;

            this.mpY *= -1;
        });
    }
}

export const user = new User();
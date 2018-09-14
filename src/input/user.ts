import {canvas} from "../context";

class User {
    mpX: number = 0;
    mpY: number = 0;
    force: number = 0.0;

    constructor() {
        document.addEventListener("mousemove", (e) => {
            this.mpX = ((e.pageX / canvas.width) - 0.5) * 2 * canvas.width / canvas.height;
            this.mpY = ((e.pageY / canvas.height) - 0.5) * 2;

            this.mpY *= -1;
        });

        document.addEventListener("click", (e) => {
            if (this.force > 0.0) {
                this.force = 0.0;
            } else {
                this.force = 1.0;
            }
        });
    }
}

export const user = new User();
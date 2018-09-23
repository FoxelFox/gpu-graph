import {canvas} from "../context";

class User {
    mpX: number = 0;
    mpY: number = 0;
    movementX: number = 0;
    movementY: number = 0;
    positionX: number = 0;
    positionY: number = 0;
    wheel: number = 0;
    force: number = 0.0;
    mousePressed: boolean;

    constructor() {
        document.addEventListener("mousemove", (e) => {
            this.mpX = ((e.pageX / canvas.width) - 0.5) * 2 * canvas.width / canvas.height;
            this.mpY = ((e.pageY / canvas.height) - 0.5) * 2;
            this.mpY *= -1;


            this.movementX = e.x - this.positionX;
            this.movementY = e.y - this.positionY;

            this.positionX = e.x;
            this.positionY = e.y;
        });

        document.addEventListener("click", () => {
            if (this.force > 0.0) {
                this.force = 0.0;
            } else {
                this.force = 1.0;
            }
        });

        document.addEventListener("mouseup", () => {
            this.mousePressed = false;
        });

        document.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });

        document.addEventListener("mousewheel", (e) => {
            this.wheel += e.deltaY;
        });

    }
}

export const user = new User();



class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.dir = createVector(1,1);
        this.rays = [];
        for (let ang = -FOV/2; ang < FOV/2; ang += 5) {
            rays.push(new Ray(startPosX, startPosY, radians(ang) ));
        }
    }

    move(s, f) {
        // let tempHead = (this.dir.heading() >= 0) ? this.dir.heading() : 2*Math.PI - abs(this.dir.heading());
        // console.log(tempHead);
        // const phi = tempHead % (Math.PI /2);
        // this.pos.x = this.pos.x + f*cos(phi);
        // this.pos.y = this.pos.y + f*cos(Math.PI/2 - phi);
        this.pos.x = this.pos.x + this.dir.x * f;
        this.pos.y = this.pos.y + this.dir.y * f;
    }
    rotate(ds) {
        this.dir = p5.Vector.fromAngle(this.dir.heading() + radian(ds));
        //console.log((180/Math.PI) * this.dir.heading())

    }

    show() {
        push();
        //fill(0,200,0);
        stroke(200);
        translate(this.pos.x, this.pos.y);
        ellipse(0,0, 2,2);
        line(0,0, 50 * this.dir.x, this.dir.y *50);
        pop();
    }
}
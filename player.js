
const step_size = 2;

class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.dir = createVector(0,0);
        this.rays = [];
        this.updateRays();
    }

    updateRays() {
        this.rays = [];
        for (let ang = degrees(this.dir.heading()) - FOV/2; ang <= degrees(this.dir.heading()) + FOV/2; ang += step_size) {
            this.rays.push(new Ray(this.pos.x, this.pos.y, radians(ang) ));
        }
        //console.log(this.rays.length);
    }

    move(s, f) {
        // let tempHead = (this.dir.heading() >= 0) ? this.dir.heading() : 2*Math.PI - abs(this.dir.heading());
        // const phi = tempHead % (Math.PI /2);
        // this.pos.x = this.pos.x + f*cos(phi);
        // this.pos.y = this.pos.y + f*cos(Math.PI/2 - phi);
        this.pos.x = this.pos.x + this.dir.x * f;
        this.pos.y = this.pos.y + this.dir.y * f;
        this.updateRays();
    }
    
    rotate(ds) {
        this.dir = p5.Vector.fromAngle(this.dir.heading() + radian(ds));
        this.updateRays();
        //console.log(this.rays.length);
        //console.log((180/Math.PI) * this.dir.heading())

    }

    show() {
        push();
        fill(0,200,0);
        stroke(200);
        translate(this.pos.x, this.pos.y);
        ellipse(0,0, 5,5);
        //line(0,0, 50 * this.dir.x, this.dir.y *50);
        stroke(155,200,0,100);
        

        pop();
    }
}
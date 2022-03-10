

class Ray {
    constructor(x,y, angle) {
        this.pos = createVector(x,y);
        this.dir = p5.Vector.fromAngle(angle);
    }

    lookAt(ds) {
        this.dir = p5.Vector.fromAngle(this.dir.heading() + ds);
        //this.dir.normalize();
    }

    move(x, y) {
        this.pos.x = this.pos.x + x;
        this.pos.y = this.pos.y + y;
    }

    cast(wall) {
        const x1 = this.pos.x;
        const y1 = this.pos.y;
        const x2 = this.pos.x + this.dir.x;
        const y2 = this.pos.y + this.dir.y;
        const x3 = wall.x1;
        const y3 = wall.y1;
        const x4 = wall.x2;
        const y4 = wall.y2;
        

        let d = (x1-x2)*(y3-y4) - (y1 - y2)*(x3 - x4);
        if (d == 0) {
            return false;
        }

        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / d;
        let u = ((x1 - x3)*(y1 - y2) - (y1 - y3)*(x1 - x2)) / d;
        //console.log(t)
        if(u <= 1 && t >= 0 && u >= 0) {
            const px = x1 + t*(x2 - x1);
            const py = y1 + t*(y2 - y1);
            return createVector(px, py);
        } 
        return null;
    }

    show() {

        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, 5,5);
        line(0,0 , 10* this.dir.x, 10*this.dir.y);
        pop();

    }
    
}
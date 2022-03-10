const wWidth = 800;
const wHeight = 600;
const FOV = 70;
const startPosX = 100;
const startPosY = 150;

let rays = [];
let walls = [];
let player;

function radian(deg) {
    return deg * Math.PI/180;
}

function setup() {
    createCanvas(wWidth, wHeight);
    for (let i = 0; i < 5; i += 1) {
        walls[i] = new Boundary(Math.random()*wWidth, Math.random()*wHeight, Math.random()*wWidth, Math.random()*wHeight);
    }
    walls.push(new Boundary(0, 0, wWidth, 0));
    walls.push(new Boundary(wWidth, 0, wWidth,wHeight));
    walls.push(new Boundary(0,wHeight, wWidth,wHeight));
    walls.push(new Boundary(0, 0, 0, wHeight));

    player = new Player(startPosX, startPosY);
    background(0);

} 
function draw() {
    background(0);

    player.show();
    for(let wall of walls) {
        wall.show();
    }
    for (let ray of player.rays) {
        let closest = createVector(0,0);
        let min = Infinity;
        for (let wall of walls) {
            let p = ray.cast(wall);
            if (p) {
                let distance = Math.sqrt(Math.pow(p.x - ray.pos.x,2) + Math.pow(p.y - ray.pos.y,2));
                if (distance < min) {
                    min = distance;
                    closest = p;
                }
            }
        }
        if (min < Infinity) {
            line(ray.pos.x, ray.pos.y, closest.x, closest.y);
            ellipse(closest.x,closest.y, 2, 2);
        }
    }

    //movement
    if(keyIsDown(65)) { //a

        player.rotate(-1);
    }
    if (keyIsDown(68)) { //d
        player.rotate(1);
    }
    if (keyIsDown(87)) { //w
        player.move(0, 2);
    }
    if (keyIsDown(83)) { //s
        player.move(0, -2);
    }
 
}

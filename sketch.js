const cWidth = 400;
const cHeight = 400;
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
    createCanvas(cWidth, cHeight);
    pg = createGraphics(cWidth, cHeight);
    pg.position(cWidth +10, 10);

    for (let i = 0; i < 8; i += 1) {
        walls[i] = new Boundary(Math.random()*cWidth, Math.random()*cHeight, Math.random()*cWidth, Math.random()*cHeight);
    }
    walls.push(new Boundary(0, 0, cWidth, 0));
    walls.push(new Boundary(cWidth, 0, cWidth,cHeight));
    walls.push(new Boundary(0,cHeight, cWidth,cHeight));
    walls.push(new Boundary(0, 0, 0, cHeight));

    player = new Player(startPosX, startPosY);
    background(0);

} 
function draw() {
    background(0);
    pg.background(0);
   
    player.show();
    let scene = player.look(walls);
    for(let wall of walls) {
        wall.show();
    }

    //viewscreen
    push();
    pg.noStroke();
    
    let perpDist;
    let dx = cWidth/scene.length;
    let theta = player.dir.heading() - radians(FOV/2);
    for (let i = 0; i < scene.length; i+= 1) {
        theta = theta + radians(step_size);
        perpDist = scene[i] * Math.cos(player.dir.heading() - theta);
        let wallHeight = 10*cHeight/perpDist;
        pg.fill(wallHeight/cHeight * 255);
        pg.rect(i* dx, (cHeight - wallHeight) / 2, dx, wallHeight);
    }
    pg.show();
    pop();

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

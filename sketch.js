const wWidth = 800;
const wHeight = 600;
const FOV = 66;
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

    for (let ang = -FOV/2; ang < FOV/2; ang += 5) {
        rays.push(new Ray(startPosX, startPosY, radians(ang) ));
    }
    background(0);

} 
function draw() {
    background(0);
    // a.show();
    // a.lookAt(mouseX, mouseY);


    for(let wall of walls) {
        wall.show();
    }

    push();
    stroke(155,200,0,100);
    for (let ray of rays) {
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
        //console.log()
        if (min < Infinity) {
            line(ray.pos.x, ray.pos.y, closest.x, closest.y);
        }

        // //movement
        if(keyIsDown(65)) { //a
            ray.lookAt(radians(-5));
            player.rotate(-0.5);
        }
        if (keyIsDown(68)) { //d
            ray.lookAt(radians(5));
            player.rotate(0.5);
        }
        if (keyIsDown(87)) { //w
            player.move(0, 1);
        }
        if (keyIsDown(83)) { //s
            player.move(0, -1);
        }
       

    }

    player.show();
    pop();

    

    // for (let i = 0; i < 360; i +=5) {

    

    
}

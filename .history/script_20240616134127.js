const canvas = document.getElementById('simCanvas');
const context = canvas.getContext('2d');

const gravity = 9.8;
const timeStep = 0.016;

let objects = [];

function PhysicsObjects(type, x, y, mass, width, height, restitution) {
    this.type = type
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.radius = width / 2; //for circle
    this.restitution = restitution
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = gravity;
}

PhysicsObjects.prototype.update = function(dt) {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    
    this.x += this.vx * dt;
    this.y += this.vy * dt;
};

PhysicsObjects.prototype.draw = function() {
    context.beginPath();
    if (this.type === 'rectangle'){
        context.rect(this.x - this.width / 2, this.y = this.height/2, this.width, this.height);
    } else if (this.type === 'circle'){
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();  
};

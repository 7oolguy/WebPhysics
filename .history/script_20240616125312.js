const canvas = document.getElementById('simCanvas');
const context = canvas.getContext('2d');

const gravity = 9.8; // (m/s^2)

let objects = [];

function PhysicsObjects(x, y, mass, radius) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.radius = radius;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = gravity;
}

//function to update the objects position
PhysicsObjects.prototype.update = function(dt) {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if(this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.vy *= -0.8;
    }
};

//Function to draw the Object
PhysicsObjects.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
};

objects.push(new PhysicsObjects(100, 100, 100, 20));

function simulate() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    const dt = 0.016 //assuming 60 frames per second

    for (let obj of objects) {
        obj.update(dt);
        obj.draw();
    }

    requestAnimationFrame(simulate);

}

simulate();
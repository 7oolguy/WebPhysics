const canvas = document.getElementById('simCanvas');
const context = canvas.getContext('2d');

class Atmosphere{
    constructor(gravity, air_density){
        this.gravity = gravity;
        this.air_density = air_density;
    };

    buoyant_force(volume){
        return this.air_density * this.gravity * volume;
    }

    drag_force(velocity, drag_coefficient, cross_sectional_area){
        return 0.5 * this.air_density * velocity^2 * drag_coefficient * cross_sectional_area;
    }

}

let objects = [];

class Object {
    constructor(type, x, y, mass, width, height, drag_coefficient, cross_sectional_area){
        this.type = type
        this.init_x = x;
        this.init_y = y;
        this.mass = mass;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.drag_coefficient = drag_coefficient;
        this.cross_sectional_area = cross_sectional_area;
    }

    gravitational_force(gravity){
        return this.mass * gravity;
    }

};

PhysicsObjects.prototype.update = function(dt) {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    
    this.x += this.vx * dt;
    this.y += this.vy * dt;
};

//Function to draw the shape
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


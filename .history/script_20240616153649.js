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
        return 0.5 * this.air_density * (velocity**2) * drag_coefficient * cross_sectional_area;
    }

}

let objects = [];

class Object {
    constructor(type, x, y, mass, width, height, depth, drag_coefficient, cross_sectional_area){
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

    update(gravity, timeStep) {

        this.vy += gravity * timeStep;

        this.x += this.vx * timeStep;
        this.y += this.vy * timeStep;

        if (this.y + this.height > canvas.height){
            this.y = canvas.height - this.height;
            this.vy = 0; //Reset Velocity
        }
    }

    draw(context){
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

};

function PhysicsObjects(type, x, y, mass, width, height, depth, drag_coefficient, cross_sectional_area){
    const obj = new Object(type, x, y, mass, width, height, depth, drag_coefficient, cross_sectional_area);
    objects.push(obj);
};




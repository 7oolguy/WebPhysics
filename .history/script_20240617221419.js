// Set data in localStorage
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Read data from localStorage
function readData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Calculate air density based on temperature and humidity
function airDensity(temperature, humidity) {
  return 1.2929 - (0.00468 * temperature) - (0.000065 * temperature ** 2) - (0.00012 * humidity);
}

// Set default data in localStorage
function defaultData() {
  const air = airDensity(25, 60);

  const defaultData = {
    air,
    humidity: 60,
    temperature: 25,
    gravity: 9.81,
    timeStep: 0.01
  };

  setData('data', defaultData);
}

// Set parameters in the UI
function setParam() {
  const data = readData('data');
  console.log("Data read from localStorage:", data);

  const air = document.getElementById('air-s');
  const hum = document.getElementById('hum-s');
  const tem = document.getElementById('tem-s');

  if (data) {
    console.log("Updating UI elements");
    air.textContent = data.air.toFixed(2);
    hum.textContent = data.humidity;
    tem.textContent = data.temperature;
  } else {
    console.log("No data found in localStorage");
  }
}

// Add event listener for form submission
document.getElementById('data-form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Form submitted");

  const humidityInput = e.target.querySelector('#humid-in').value;
  const temperatureInput = e.target.querySelector('#temp-in').value;
  const gravityInput = e.target.querySelector('#grav-in').value;
  const timeStepInput = e.target.querySelector('#time-in').value;

  console.log("Form input values:", {
    humidityInput,
    temperatureInput,
    gravityInput,
    timeStepInput
  });

  const data = readData('data') || {};

  // Handle input values and fallback to previous data or defaults
  const humidity = humidityInput ? parseFloat(humidityInput) : data.humidity || 60;
  const temperature = temperatureInput ? parseFloat(temperatureInput) : data.temperature || 25;
  const gravity = gravityInput ? parseFloat(gravityInput) : data.gravity || 9.81;
  const timeStep = timeStepInput ? parseFloat(timeStepInput) : data.timeStep || 0.01;

  data.air = airDensity(temperature, humidity);
  data.humidity = humidity;
  data.temperature = temperature;
  data.gravity = gravity;
  data.timeStep = timeStep;

  console.log("Updated data to be stored:", data);

  setData('data', data);
  setParam(); // Update the UI elements with new data
});

// Add event listener for button click to submit form
document.getElementById('submit-config').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button behavior
  document.getElementById('data-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  console.log("Submitted via button click");
});

// Open and move configuration tab
document.addEventListener('DOMContentLoaded', () => {
  const tabsConfig = [
    { openBtnId: 'config', closeBtnId: 'closeBtn', tabId: 'floatingTab', headerId: 'tabHeader' },
    { openBtnId: 'add', closeBtnId: 'closeBtn-add', tabId: 'add-floatingTab', headerId: 'add-tabHeader' }
  ];

  tabsConfig.forEach(({ openBtnId, closeBtnId, tabId, headerId }) => {
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const floatingTab = document.getElementById(tabId);
    const tabHeader = document.getElementById(headerId);

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        floatingTab.style.display = "block";
      });
    } else {
      console.error(`Element with ID '${openBtnId}' not found`);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        floatingTab.style.display = "none";
      });
    } else {
      console.error(`Element with ID '${closeBtnId}' not found`);
    }

    if (tabHeader && floatingTab) {
      tabHeader.addEventListener("mousedown", (e) => {
        const shiftX = e.clientX - floatingTab.getBoundingClientRect().left;
        const shiftY = e.clientY - floatingTab.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
          floatingTab.style.left = pageX - shiftX + 'px';
          floatingTab.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", onMouseMove);
        }, { once: true });
      });

      tabHeader.addEventListener("dragstart", () => false);
    }
  });

  setParam(); // Initialize parameters in the UI
});

// Physics Calculations
function gravitationalForceY(mass, g){
  return mass * g;
}
function buoyantForceY(fluidDensity, volume, g){
  return fluidDensity * volume * g;
}
function dragForceY(fluidDensity, velocityY, dragCoefficient, crossSectionalArea){
  return 0.5 * fluidDensity * velocityY ** 2 * dragCoefficient * crossSectionalArea * Math.sign(velocityY);
}
function dragForceX(fluidDensity, velocityX, dragCoefficient, crossSectionalArea){
  return 0.5 * fluidDensity * velocityX ** 2 * dragCoefficient * crossSectionalArea * Math.sign(velocityX);
}
function netForceX(dragForceX){
  return -dragForceX;
}
function netForceY(gravitationalForceY, buoyantForceY, dragForceY){
  return gravitationalForceY - buoyantForceY - dragForceY;
}
function accelerationX(netForceX, mass){
  return netForceX / mass;
}
function accelerationY(netForceY, mass){
  return netForceY / mass;
}

const canvas = document.getElementById('simCanvas');
const context = canvas ? canvas.getContext('2d') : null;
let objects = [];

function Ball(x, y, radius, color, dx, dy, mass, volume){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.dy = dy;
  this.mass = mass;
  this.volume = volume;
  this.crossSectionalArea = (Math.PI * (radius * 2) ** 2) / 4;
  this.dragCoefficient = 0.47;
}

Ball.prototype.draw = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
}

Ball.prototype.update = function () {
  const data = readData('data');

  const netFx = netForceX(dragForceX(data.air, this.dx, this.dragCoefficient, this.crossSectionalArea));
  const netFy = netForceY(
    gravitationalForceY(this.mass, data.gravity),
    buoyantForceY(data.air, this.volume, data.gravity),
    dragForceY(data.air, this.dy, this.dragCoefficient, this.crossSectionalArea)
  );

  this.dx += accelerationX(netFx, this.mass) * data.timeStep;
  this.dy += accelerationY(netFy, this.mass) * data.timeStep;

  this.x += this.dx * data.timeStep;
  this.y += this.dy * data.timeStep;

  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }
  if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    this.dy = -this.dy;
  }
}

const balls = [
  new Ball(100, 10, 5, "blue", 1000, 1000, 10000, 0.2)
];

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });

  requestAnimationFrame(animate);
}

animate();

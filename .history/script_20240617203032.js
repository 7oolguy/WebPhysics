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
    gravity: 9.81
  };

  setData('data', defaultData);
}

// Set parameters in the UI
function setParam() {
  const data = readData('data');

  const air = document.getElementById('air-s');
  const hum = document.getElementById('hum-s');
  const tem = document.getElementById('tem-s');

  if (data) {
    air.textContent = data.air.toFixed(2);
    hum.textContent = data.humidity;
    tem.textContent = data.temperature;
  }
}

// Add event listener for form submission
document.getElementById('data-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const humidityInput = e.target.querySelector('#humid-in').value;
  const temperatureInput = e.target.querySelector('#temp-in').value;
  const gravityInput = e.target.querySelector('#grav-in').value;

  const data = readData('data') || {};

  // Handle input values and fallback to previous data or defaults
  const humidity = humidityInput ? parseFloat(humidityInput) : data.humidity || 60;
  const temperature = temperatureInput ? parseFloat(temperatureInput) : data.temperature || 25;
  const gravity = gravityInput ? parseFloat(gravityInput) : data.gravity || 9.81;

  data.air = airDensity(temperature, humidity);
  data.humidity = humidity;
  data.temperature = temperature;
  data.gravity = gravity;

  setData('data', data);
  setParam();
});

// Add event listener for button click to submit form
document.getElementById('submit-config').addEventListener('click', () => {
  document.getElementById('data-form').submit();
  console.log("Submitted");
});

// Open and move configuration tab
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById("config");
  const closeBtn = document.getElementById("closeBtn");

  if (openBtn) {
    openBtn.addEventListener("click", function () {
      const floatingTab = document.getElementById("floatingTab");
      floatingTab.style.display = "block";
    });
  } else {
    console.error("Element with ID 'config' not found");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const floatingTab = document.getElementById("floatingTab");
      floatingTab.style.display = "none";
    });
  } else {
    console.error("Element with ID 'closeBtn' not found");
  }

  function makeTabDraggable() {
    const floatingTab = document.getElementById("floatingTab");
    const tabHeader = document.getElementById("tabHeader");

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
    
      tabHeader.addEventListener("dragstart", () => {
        return false;
      });
    }
  }

  makeTabDraggable();
  setParam(); // Initialize parameters in the UI
});

// Canvas Functions
const canvas = document.getElementById('simCanvas');
const context = canvas ? canvas.getContext('2d') : null;

let objects = [];

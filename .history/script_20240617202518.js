function setData(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function readData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

//Physics Calculations
function airDensity(temperature, humidity) {
  return 1.2929 - (0.00468 * temperature) - (0.000065 * temperature**2) - (0.00012 * humidity);
}

function defaultData(){
  const air = airDensity(25, 60);

  const defaultData = {
    air,
    humidity: 60,
    temperature: 25,
    gravity: 9.81
  };

  setData('data', defaultData);
}

function setParam() {
  const data = readData('data');
  
  const air = document.getElementById('air-s');
  const hum = document.getElementById('hum-s');
  const tem = document.getElementById('tem-s');

  air.textContent = data.air;
  hum.textContent = data.humidity;
  tem.textContent = data.temperature;
}

document.getElementById('data-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const humidityInput = e.target.querySelector('#humid-in');
  const temperatureInput = e.target.querySelector('#temp-in');
  const gravityInput = e.target.querySelector('#grav-in');

  let humidity = humidityInput.value;
  let temperature = temperatureInput.value;
  let gravity = gravityInput.value;

  const data = readData('data');

  if (!humidity) {
    humidity = data.humidity;
  }
  if (!temperature) {
    temperature = data.temperature;
  }
  if (!gravity) {
    gravity = data.gravity;
  }

  data.air = airDensity(parseFloat(temperature), parseFloat(humidity));
  data.humidity = parseFloat(humidity);
  data.temperature = parseFloat(temperature);
  data.gravity = parseFloat(gravity);

  setData('data', data);

  setParam();
  console.log("done");
});

document.getElementById('submit-config').addEventListener('click', () => {
  document.getElementById('data-form').submit();
  console.log("Submitted");
});

//Open and Move Configuration TAB
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

  makeTabDraggable();
});

//Canvas Functions
const canvas = document.getElementById('simCanvas');
const context = canvas.getContext('2d');

let objects = [];

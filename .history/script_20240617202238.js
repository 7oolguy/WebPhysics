
function setData(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function readData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

//Physics Calculations

function airDensity(temperature, humidity) {
  return airDensity = 1.2929 - (0.00468 * temperature)-(0.000065 * temperature**2)-(0.00012 * humidity);
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
  const data = JSON.parse(readData('data'));
  
  const air = document.getElementById('air-s');
  const hum = document.getElementById('hum-s');
  const tem = document.getElementById('tem-s');

  air.textContent = data.air;
  hum.textContent = data.humidity;
  tem.textContent = data.temperature;

}


document.getElementById('data-form').addEventListener('submit', (e) => {

  e.preventDefault();


  const humidity = e.target.querySelector('#humid-in');
  const temperature = e.target.querySelector('#temp-in');
  const gravity = e.target.querySelector('#grav-in');
  const data = JSON.parse(readData('data'));
  console.log("Iam here");

  if(humidity == null){
    humidity = data.humidity;
  } else if (temperature == null) {
    temperature = data.temperature;
  } else if (gravity == null) {
    gravity = data.gravity;
  }

  data.air = airDensity(temperature, humidity);
  data.humidity = humidity;
  data.temperature = temperature;
  data.gravity = gravity;

  setItem('data', data);

  setParam();

});


document.getElementById('submit-config').addEventListener('click', () => {
  document.getElementById('data-form').submit;
  console.log("Submitted");
});


//Open and Move Configuration TAB
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById("config");
  const closeBtn = document.getElementById("closeBtn");

  if(openBtn) {
    openBtn.addEventListener("click", function () {
      const floatingTab = document.getElementById("floatingTab");
      floatingTab.style.display = "block";
    });
  } else {
    console.error("Element with ID 'openBtn' not found");
  }

  if(closeBtn) {
    closeBtn.addEventListener("click", function () {
      const floatingTab = document.getElementById("floatingTab");
      floatingTab.style.display = "none";
    });
  } else {
    console.error("Element with ID 'openBtn' not found")
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
})

//Canvas Functions
const canvas = document.getElementById('simCanvas');
const context = canvas.getContext('2d');

let objects = [];
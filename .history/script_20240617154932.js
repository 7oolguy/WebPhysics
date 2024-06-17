

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
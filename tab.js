// Function to open the floating tab
export function openTab() {
    const floatingTab = document.getElementById("floatingTab");
    floatingTab.style.display = "block";
  }
  
  // Function to close the floating tab
  export function closeTab() {
    const floatingTab = document.getElementById("floatingTab");
    floatingTab.style.display = "none";
  }
  
  // Function to make the tab draggable
  export function makeTabDraggable() {
    const floatingTab = document.getElementById("floatingTab");
    const tabHeader = document.getElementById("tabHeader");
  
    tabHeader.addEventListener("mousedown", function(e) {
      let shiftX = e.clientX - floatingTab.getBoundingClientRect().left;
      let shiftY = e.clientY - floatingTab.getBoundingClientRect().top;
  
      function moveAt(pageX, pageY) {
        floatingTab.style.left = pageX - shiftX + 'px';
        floatingTab.style.top = pageY - shiftY + 'px';
      }
  
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
  
      document.addEventListener("mousemove", onMouseMove);
  
      document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", onMouseMove);
      }, { once: true });
    });
  
    tabHeader.addEventListener("dragstart", function() {
      return false;
    });
  }
  
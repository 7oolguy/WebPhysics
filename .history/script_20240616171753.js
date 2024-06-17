import { openTab, closeTab, makeTabDraggable } from './tab.js';

document.addEventListener("DOMContentLoaded", function() {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Open the floating tab
  openBtn.addEventListener("click", openTab);

  // Close the floating tab
  closeBtn.addEventListener("click", closeTab);

  // Make the tab draggable
  makeTabDraggable();
});

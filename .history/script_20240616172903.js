import { openTab, closeTab, makeTabDraggable } from './tab.js';

document.addEventListener("DOMContentLoaded", function() {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  if (openBtn) {
    openBtn.addEventListener("click", openTab);
  } else {
    console.error("Element with ID 'openBtn' not found");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeTab);
  } else {
    console.error("Element with ID 'closeBtn' not found");
  }

  makeTabDraggable();
});

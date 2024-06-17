document.addEventListener('DOMContentLoaded', function() {
    const floatingTab = document.getElementById("floatingTab");
    const openBtn = document.getElementById("configuration");
    const closeBtn = document.getElementById("closeBtn");
    const tabHeader = document.getElementById("tabHeader");

    openBtn.addEventListener("click", function() {
        floatingTab.style.display = "none";
    });

    closeBtn.addEventListener("click", function() {
        floatingTab.style.display = "none";
    });

    tabHeader.addEventListener("mouseDown", function(e) {
        let shiftX = e.clientX - floatingTab.getBoundingClientRect().left;
        let shiftY = e.clientY - floatingTab.getBoundingClientRect().right;

        function moveAt(pageX, pageY) {
            floatingTab.style.left = pageX - shiftX + 'px';
            floatingTab.style.right = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", function(){
            document.removeEventListener("mousemove", onMouseMove);
        }, {once: true});
    });

    tabHeader.addEventListener("dragstart", function() {
        return false;
    });
})
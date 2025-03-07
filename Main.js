/// Main.js

// Global variable to store the container reference.
let fciContainer = null;

// Attach a single message event listener on window.
window.addEventListener("message", function (msg) {
  if (msg.data.toString().startsWith("execute:")) {
    eval(msg.data.toString().replace("execute:", ""));
    if (fciContainer) {
      fciContainer.remove();
      fciContainer = null;
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "~" && e.ctrlKey) {
    // Prevent creating multiple containers.
    if (fciContainer) return;
    
    // Create a floating container instead of opening a new tab.
    var container = document.createElement("div");
    container.id = "fci-container";
    container.style.position = "fixed";
    container.style.width = "500px";
    container.style.height = "300px";
    container.style.top = "100px";
    container.style.left = "100px";
    container.style.background = "#fff";
    container.style.border = "2px solid #007BFF";
    container.style.borderRadius = "10px";
    container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
    container.style.zIndex = "9999";

    // Create a header for dragging and include a close button.
    var header = document.createElement("div");
    header.style.cursor = "move";
    header.style.background = "#007BFF";
    header.style.color = "#fff";
    header.style.padding = "5px";
    header.style.borderTopLeftRadius = "10px";
    header.style.borderTopRightRadius = "10px";
    header.innerHTML =
      "Fci <button style='float: right; background: red; color: white; border: none; border-radius: 5px; padding: 2px 5px;'>X</button>";
    container.appendChild(header);

    // Attach event to close button to remove container.
    header.querySelector("button").addEventListener("click", function () {
      container.remove();
      fciContainer = null;
    });

    // Create the iframe inside the container.
    var iframe = document.createElement("iframe");
    iframe.src = "//edt-fci.staticrun.app";
    iframe.style.width = "100%";
    iframe.style.height = "calc(100% - 30px)"; // leaving space for the header.
    iframe.style.border = "none";
    container.appendChild(iframe);

    // Append container to the body.
    document.body.appendChild(container);
    fciContainer = container;

    // Make the container draggable via the header.
    var isDragging = false;
    var offsetX, offsetY;
    header.addEventListener("mousedown", function (e) {
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    });
    function drag(e) {
      if (isDragging) {
        container.style.left = e.clientX - offsetX + "px";
        container.style.top = e.clientY - offsetY + "px";
      }
    }
    function stopDrag() {
      isDragging = false;
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
    }
  }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "~" && e.ctrlKey) {
        if (document.getElementById("fciFloatingIframe")) return; // Prevent duplicates

        // Create the floating container
        let container = document.createElement("div");
        container.id = "fciFloatingIframe";
        container.style.cssText = `
            position: fixed;
            top: 50px; left: 50px;
            width: 500px; height: 300px;
            background: white;
            border: 2px solid black;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
            z-index: 1000;
            resize: both;
            overflow: hidden;
            border-radius: 8px;
        `;

        // Create the title bar for dragging
        let titleBar = document.createElement("div");
        titleBar.style.cssText = `
            background: black;
            color: white;
            padding: 5px;
            cursor: move;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        titleBar.innerHTML = `<span>Fci Frame</span>`;

        // Close Button
        let closeButton = document.createElement("button");
        closeButton.innerText = "X";
        closeButton.style.cssText = `
            background: red;
            color: white;
            border: none;
            cursor: pointer;
            padding: 2px 6px;
        `;
        closeButton.onclick = () => container.remove();

        // View Source Button
        let sourceButton = document.createElement("button");
        sourceButton.innerText = "View Source";
        sourceButton.style.cssText = `
            background: blue;
            color: white;
            border: none;
            cursor: pointer;
            padding: 2px 6px;
            margin-right: 5px;
        `;
        sourceButton.onclick = async () => {
            let response = await fetch("https://fcihtml.staticrun.app/");
            let text = await response.text();
            let newWin = window.open("", "_blank");
            newWin.document.write(`<pre>${escapeHtml(text)}</pre>`);
            newWin.document.title = "Source Code";
        };

        // Add buttons to title bar
        let buttonContainer = document.createElement("div");
        buttonContainer.appendChild(sourceButton);
        buttonContainer.appendChild(closeButton);
        titleBar.appendChild(buttonContainer);

        // Create the iframe
        let iframe = document.createElement("iframe");
        iframe.src = "https://fcihtml.staticrun.app/";
        iframe.style.cssText = "width:100%; height:calc(100% - 25px); border:none;";

        // Append everything
        container.appendChild(titleBar);
        container.appendChild(iframe);
        document.body.appendChild(container);

        // Make draggable
        makeDraggable(container, titleBar);

        // Function to make element draggable
        function makeDraggable(element, handle) {
            let offsetX, offsetY, isDragging = false;
            handle.onmousedown = (e) => {
                isDragging = true;
                offsetX = e.clientX - element.offsetLeft;
                offsetY = e.clientY - element.offsetTop;
                document.onmousemove = (e) => {
                    if (isDragging) {
                        element.style.left = e.clientX - offsetX + "px";
                        element.style.top = e.clientY - offsetY + "px";
                    }
                };
                document.onmouseup = () => (isDragging = false);
            };
        }

        // Function to escape HTML characters
        function escapeHtml(text) {
            return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    }
});

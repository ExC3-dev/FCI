/// Main.js

document.addEventListener("keydown", function (e) {
    if (e.key == "~" && e.ctrlKey) {
        // Open a new window with the given dimensions
        var t = window.open("", "_blank", "width=500,height=300");

        // Create an iframe element
        var iframe = t.document.createElement("iframe");
        
        // Set iframe styles to take up the entire window
        iframe.style.cssText = "width:100%; height:100%; border:none;";

        // Append the iframe to the new window's body
        t.document.body.appendChild(iframe);
        
        // Set the new window's title
        t.document.title = "uRun";

        // Fetch the HTML code from your Pastebin URL
        fetch("https://pastebin.com/raw/TThP2Aqv")
            .then(response => response.text())
            .then(html => {
                // Once the HTML is fetched, inject it into the iframe
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                iframeDoc.open();
                iframeDoc.write(html);  // Inject the HTML code into the iframe
                iframeDoc.close();
                
                // Optionally, send a message to the iframe after it loads
                iframe.contentWindow.postMessage("Hello from the parent window!", "*");
            })
            .catch(error => {
                console.error("Error loading HTML:", error);
            });

        // Add a listener for messages coming from the iframe
        t.addEventListener("message", function (event) {
            if (event.data.toString().startsWith("execute:")) {
                eval(event.data.toString().replace("execute:", ""));
                t.close(); // Close the window after execution
            }
        });
    }
});

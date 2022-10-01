var SERVER_NAME = "image-api";
var PORT = 5000;
var HOST = "127.0.0.1";

// GET request count
var requestGetCounter = 0;

//POST reequest count
var requestPostCounter = 0;

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

// Allow the use of POST
server.use(restify.fullResponse());

// Maps req.body to req.params so there is no switching between them
server.use(restify.bodyParser());

// Function to log GET and POST request counter
const requestCountLogger = () => {
  console.log(
    "Processed Request Count--> Get:%s, Post:%s",
    requestGetCounter,
    requestPostCounter
  );
};

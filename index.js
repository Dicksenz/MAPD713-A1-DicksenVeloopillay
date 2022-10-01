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

// Create a new image
server.post("/images", function (req, res, next) {
  // increment POST request counter
  requestPostCounter++;
  // Call function to log information
  requestCountLogger();

  // Make sure imageId is defined
  if (req.params.name === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError("imageId must be supplied"));
  }
  // Make sure name is defined
  if (req.params.name === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError("name must be supplied"));
  }
  if (req.params.url === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError("Url must be supplied"));
  }
  if (req.params.size === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError("Size must be supplied"));
  }

  // Create image object
  var newImage = {
    imageId: req.params.imageId,
    name: req.params.name,
    url: req.params.url,
    size: req.params.size,
  };

  // Create the user using the persistence engine
  imagesSave.create(newImage, function (error, image) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(JSON.stringify(error.errors));

    // Send the user if no issues
    res.send(201, image);
  });
});

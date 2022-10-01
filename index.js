var SERVER_NAME = "image-api";
var PORT = 8000;
var HOST = "127.0.0.1";

var restify = require("restify");

// Get a persistence engine for the images
var imagesSave = require("save")("images");

// Create the restify server
server = restify.createServer({ name: SERVER_NAME });

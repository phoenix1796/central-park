"use strict";

const Hapi = require("hapi");

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000
});

let a = {};

const makeRoute = preRouteObj => {
  switch (preRouteObj["type"]) {
    case "string":
      return [{ method: "GET", path: `/${preRouteObj["key"]}` }];
  }
};

const createRoutes = obj => {
  return obj.map(preRouteObj => makeRoute(obj));
};

// Add the route
server.route({
  method: "POST",
  path: "/cab",
  handler: function(request, h) {
    // console.log(request.payload);
    const body = request.payload;
    const body_struct = Object.keys(body).map(key => ({
      key: key,
      value: body[key],
      type: Array.isArray(body[key]) ? "array" : typeof body[key]
    }));
    console.log(body_struct);

    return "hello world";
  }
});

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();

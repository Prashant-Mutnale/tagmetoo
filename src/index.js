import http from "http";
import https from "https";

let app = require("./server").default;
const server = https.createServer(app);

server.listen(process.env.PORT, error => {
  if (error) {
    console.log(error);
  }
  console.log(
    `React SSR App is running: https://localhost:${process.env.PORT}`
  );
});

let currentApp = app;
if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("Server reloading...");

    try {
      app = require("./server").default;
      server.removeListener("request", currentApp);
      server.on("request", app);
      currentApp = app;
    } catch (error) {
      // Do nothing
    }
  });
}

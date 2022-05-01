import { logger } from "./logger.js";

export default class Routes {
  io;
  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }
  async handler(request, response) {
    response.writeHead("Access-Control-Allow-Origin", "*");
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;
    return chosen.apply(this, [request, response]);
  }

  async defaultRoute(request, response) {
    response.end("hello world");
  }

  async options(request, response) {
    response.writeHead(204);
    response.end("hello world");
  }

  async post(request, response) {
    logger.inf("post request...");
    response.end("hello world");
  }

  async get(request, response) {
    logger.info("get request...");
    response.end("hello world");
  }
}

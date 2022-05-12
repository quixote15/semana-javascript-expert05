import FileHelper from "./fileHelper.js";
import { logger } from "./logger.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

/**
 * No CommonJS module system The require function
 * has a method called require.resolve.
 * This can be used to determine the absolute path for any required module.
 *
 * For Example:
 * calling console.log(`require('pino')`, '\t', ' =>', require.resolve('pino'))
 * -> mycomputer/this_project/node_modules/pino/pino.js
 *
 * However, in ESM to get the current path it is a little more tricky
 * Option 1: use experimental import.meta.resolve which returns a promise tha resolve to the file path
 * Option 2: workaround
 * const require = createRequire(file.meta.url)
 * fileURLToPath(require.resolve('pino'))
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, "../", "downloads");
export default class Routes {
  io;
  constructor(downloadsFolder = defaultDownloadsFolder) {
    this.downloadsFolder = downloadsFolder;
    this.fileHelper = FileHelper;
  }

  setSocketInstance(io) {
    this.io = io;
  }
  async handler(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
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
    logger.info("post request...");
    response.end();
  }

  async get(request, response) {
    logger.info("get request...");
    const files = await this.fileHelper.getFilesStatus(this.downloadsFolder);
    response.writeHead(200);
    response.end(JSON.stringify(files));
  }
}

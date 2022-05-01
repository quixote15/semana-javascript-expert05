import { readFileSync } from "fs";
import https from "https";
import { logger } from "./logger.js";

const PORT = process.env.PORT || 3000;

const localHostSSL = {
  key: readFileSync("./certificates/key.pem"),
  cert: readFileSync("./certificates/cert.pem"),
};

const server = https.createServer(localHostSSL, (req, res) =>
  res.end("hello world")
);

const startServer = () => {
  const { address, port } = server.address();

  logger.info(`app running at https://${address}:${port}`);
};

server.listen(PORT, startServer);

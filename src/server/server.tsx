/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import http from "http";
import { StringDecoder } from "string_decoder";
import { cspHeaderValues, parseJsonToObject } from "./utils";
import { IServerData } from "./interfaces";
import logger from "./utils/logger";
import useRouter from "./router";

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url!.toString(), "http://localhost:8000");
  const { pathname } = parsedUrl;
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.searchParams;
  const method = req.method?.toLowerCase();
  const { headers } = req;
  const decoder = new StringDecoder("utf-8");

  let buffer = "";

  req.on("data", async (data) => {
    logger.info("got some data", "http.createServer:on(data)");
    buffer += decoder.write(await data);
  });
  req.on("end", async () => {
    // request part is finished... we can send a response now

    buffer += decoder.end();
    res.setHeader("Content-Security-Policy", cspHeaderValues);
    const data: IServerData = {
      trimmedPath,
      queryString: queryStringObject,
      headers,
      method,
      payload: parseJsonToObject(buffer),
    };

    await useRouter(req, res, data);
  });
});

server.listen(PORT, () => {
  logger.info(
    `Server running at http://localhost:${PORT}/`,
    "http.createServer:on(listen)"
  );
});

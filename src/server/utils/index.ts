import fs from "fs";
import path from "path";
import http from "http";

export const staticFolder = path.join(__dirname, "static");

export const isCompressedOrClient = (req: http.IncomingMessage): boolean =>
  req.url?.includes(".br") ||
  req.url?.includes("client" || /\.(css|html|svg|jpeg|jpg|gif)$/) ||
  false;

export const isJsAndNotClient = (req: http.IncomingMessage): boolean =>
  (req.url?.includes(".js") && !req.url?.includes("client")) || false;

export const findFileByPartialName = (name: string) => {
  const files = fs.readdirSync(staticFolder);
  const file = files.find((f) => f.includes(name));
  return file as string;
};

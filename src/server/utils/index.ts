import fs from "fs";
import path from "path";
import http from "http";
import crypto from "node:crypto";

export const staticFolder = path.join(__dirname, "static");

export const isAsset = (req: http.IncomingMessage): boolean =>
  req.url?.includes(".br") ||
  /\.(js|css|html|svg|jpeg|jpg|gif|png|webp|pdf|tiff|woff|otf)$/.test(
    req.url
  ) ||
  false;

export const findFileByPartialName = (name: string) => {
  const files = fs.readdirSync(staticFolder);
  const file = files.find((f) => f.includes(name));
  return file as string;
};

export const getRandomString = (
  bytes: number,
  // eslint-disable-next-line no-undef
  stringFormat: BufferEncoding | undefined
) => crypto.randomBytes(bytes).toString(stringFormat);

export const generateNonces = (nonces: string[]) => {
  let n: any = {};
  const arr: any[] = [];
  nonces.forEach((nonce) => {
    const obj: any = {};

    obj[nonce] = getRandomString(16, "base64");
    arr.push(obj);
    n = Object.assign(n, obj);
  });
  return n;
};

export const parseJsonToObject = (str: string) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

export const nonces = generateNonces([
  "clientNonce",
  "reduxNonce",
  "clientHtmlNonce",
]);

export const cspHeaderValues = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'nonce-${nonces.clientNonce}' 'nonce-${nonces.reduxNonce}' 'nonce-${nonces.clientHtmlNonce}' 'nonce-appData123'`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "child-src 'self'",
  "block-all-mixed-content",
  "upgrade-insecure-requests",
].join("; ");

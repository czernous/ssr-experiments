import fs from "fs";
import path from "path";

export const staticFolder = path.join(__dirname, "static");

export const findFileByPartialName = (name: string) => {
  const files = fs.readdirSync(staticFolder);
  const file = files.find((f) => f.includes(name));
  return file as string;
};

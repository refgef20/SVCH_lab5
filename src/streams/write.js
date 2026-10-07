import fs from "node:fs";

export function Write() {
  return fs.createWriteStream("data/big-transformProduct.txt");
}

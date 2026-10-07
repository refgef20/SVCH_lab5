import fs from "node:fs";

export function Read2() {
  const stream = fs.createReadStream("data/big-products.txt");

  return stream;
}
